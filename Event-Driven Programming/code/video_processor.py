# video_processor.py
import pika
import uuid
import os
from moviepy.editor import VideoFileClip


def on_video_uploaded(ch, method, properties, body):
    video_path = body.decode()
    print(f" [x] Received video upload event for video: {video_path}")

    # Ekstrak audio dari video
    video = VideoFileClip(video_path)
    audio_path = f"audio_{uuid.uuid4()}.wav"
    video.audio.write_audiofile(audio_path)
    print(f" [x] Audio extracted to {audio_path}")

    # Mengirim event bahwa audio siap untuk ditranskripsi
    publish_audio_ready_event(audio_path)


def publish_audio_ready_event(audio_path):
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    channel.exchange_declare(exchange="audio_events", exchange_type="fanout")

    message = audio_path
    channel.basic_publish(exchange="audio_events", routing_key="", body=message)
    print(f" [x] Audio ready event sent for audio: {audio_path}")
    connection.close()


def start_video_processor():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    # Mendefinisikan exchange dan queue untuk menerima event video uploaded
    channel.exchange_declare(exchange="video_events", exchange_type="fanout")
    result = channel.queue_declare(queue="", exclusive=True)
    queue_name = result.method.queue
    channel.queue_bind(exchange="video_events", queue=queue_name)

    print(" [*] Waiting for video uploaded events. To exit press CTRL+C")
    channel.basic_consume(
        queue=queue_name, on_message_callback=on_video_uploaded, auto_ack=True
    )
    channel.start_consuming()


if __name__ == "__main__":
    start_video_processor()
