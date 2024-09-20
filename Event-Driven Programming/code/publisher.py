# publisher.py
import pika
import sys


def publish_video_uploaded_event(video_path):
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    # Membuat exchange tipe 'fanout' untuk broadcast event
    channel.exchange_declare(exchange="video_events", exchange_type="fanout")

    # Pesan berisi path video
    message = video_path
    channel.basic_publish(exchange="video_events", routing_key="", body=message)
    print(f" [x] Video uploaded event sent for video: {video_path}")
    connection.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python publisher.py <video_path>")
        sys.exit(1)
    video_path = sys.argv[1]
    publish_video_uploaded_event(video_path)
