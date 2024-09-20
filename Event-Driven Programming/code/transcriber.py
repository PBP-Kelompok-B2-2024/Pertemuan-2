import wave
import pika
import os
import json
from vosk import Model, KaldiRecognizer
from pydub import AudioSegment


# Fungsi untuk mengonversi audio stereo menjadi mono
def convert_to_mono(audio_path):
    audio = AudioSegment.from_wav(audio_path)
    if audio.channels > 1:
        mono_audio = audio.set_channels(1)
        mono_audio_path = f"mono_{os.path.basename(audio_path)}"
        mono_audio.export(mono_audio_path, format="wav")
        print(f" [x] Converted stereo audio to mono: {mono_audio_path}")
        return mono_audio_path
    return audio_path  # Jika sudah mono, langsung kembalikan path aslinya


# Fungsi untuk melakukan transkripsi offline menggunakan Vosk
def transcribe_audio_vosk(audio_path, model_path="model"):
    # Konversi audio ke mono jika perlu
    audio_path = convert_to_mono(audio_path)

    # Inisialisasi model Vosk
    model = Model(model_path)

    # Buka file audio dengan format WAV
    wf = wave.open(audio_path, "rb")

    # Pastikan file audio memiliki channel mono
    if wf.getnchannels() != 1:
        raise ValueError("Audio file must be mono channel.")

    # Inisialisasi KaldiRecognizer dengan model dan sample rate file audio
    rec = KaldiRecognizer(model, wf.getframerate())

    transcription = ""

    # Proses transkripsi secara bertahap
    while True:
        data = wf.readframes(4000)  # Baca potongan-potongan kecil dari file audio
        if len(data) == 0:  # Jika tidak ada data yang tersisa, keluar dari loop
            break
        if rec.AcceptWaveform(data):  # Jika data diterima sebagai hasil penuh
            transcription_result = json.loads(rec.Result())  # Parse JSON hasil
            transcription += transcription_result.get("text", "") + " "
        else:  # Jika data hanya diterima sebagian, proses sementara
            partial_result = json.loads(rec.PartialResult())
            print("Partial transcription: ", partial_result.get("partial", ""))

    # Hasil akhir setelah seluruh audio diproses
    final_result = json.loads(rec.FinalResult())
    transcription += final_result.get("text", "")

    return transcription


# Fungsi untuk menangani event "Audio Ready" dari RabbitMQ
def on_audio_ready(ch, method, properties, body):
    audio_path = body.decode()
    print(f" [x] Received audio ready event for audio: {audio_path}")

    try:
        # Ganti 'vosk-model-small-en-us-0.15' dengan path model Vosk yang sesuai
        model_directory = "vosk-model-en-us-0.22"
        transcription = transcribe_audio_vosk(audio_path, model_directory)
        print(f" [x] Transcription completed: {transcription}")

        # Simpan hasil transkripsi ke file teks
        transcription_path = (
            f"transcription_{os.path.splitext(os.path.basename(audio_path))[0]}.txt"
        )
        with open(transcription_path, "w") as f:
            f.write(transcription)

        # Mengirim event bahwa transkripsi siap
        publish_transcription_ready_event(transcription_path)

    except Exception as e:
        print(f" [!] Error in transcription: {e}")


# Fungsi untuk mengirim event "Transcription Ready"
def publish_transcription_ready_event(transcription_path):
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    channel.exchange_declare(exchange="transcription_events", exchange_type="fanout")

    message = transcription_path
    channel.basic_publish(exchange="transcription_events", routing_key="", body=message)
    print(
        f" [x] Transcription ready event sent for transcription: {transcription_path}"
    )
    connection.close()


# Fungsi untuk memulai transcriber dan mendengarkan event RabbitMQ
def start_transcriber():
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    # Mendefinisikan exchange dan queue untuk menerima event audio ready
    channel.exchange_declare(exchange="audio_events", exchange_type="fanout")
    result = channel.queue_declare(queue="", exclusive=True)
    queue_name = result.method.queue
    channel.queue_bind(exchange="audio_events", queue=queue_name)

    print(" [*] Waiting for audio ready events. To exit press CTRL+C")
    channel.basic_consume(
        queue=queue_name, on_message_callback=on_audio_ready, auto_ack=True
    )
    channel.start_consuming()


if __name__ == "__main__":
    start_transcriber()
