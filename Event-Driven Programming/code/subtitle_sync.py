# subtitle_sync.py
import pika
import os


def on_transcription_ready(ch, method, properties, body):
    transcription_path = body.decode()
    print(
        f" [x] Received transcription ready event for transcription: {transcription_path}"
    )

    # Di sini kita akan menyinkronkan transkripsi dengan video untuk membuat subtitle
    # Untuk kesederhanaan, kita akan menyalin transkripsi ke file .srt sederhana
    subtitle_path = f"{os.path.splitext(transcription_path)[0]}.srt"
    with open(transcription_path, "r") as f_in, open(subtitle_path, "w") as f_out:
        text = f_in.read()
        # Menulis format SRT sederhana
        f_out.write("1\n")
        f_out.write("00:00:00,000 --> 00:05:00,000\n")
        f_out.write(f"{text}\n")
    print(f" [x] Subtitle created at {subtitle_path}")


def start_subtitle_sync():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    # Mendefinisikan exchange dan queue untuk menerima event transcription ready
    channel.exchange_declare(exchange="transcription_events", exchange_type="fanout")
    result = channel.queue_declare(queue="", exclusive=True)
    queue_name = result.method.queue
    channel.queue_bind(exchange="transcription_events", queue=queue_name)

    print(" [*] Waiting for transcription ready events. To exit press CTRL+C")
    channel.basic_consume(
        queue=queue_name, on_message_callback=on_transcription_ready, auto_ack=True
    )
    channel.start_consuming()


if __name__ == "__main__":
    start_subtitle_sync()
