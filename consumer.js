import amqp from "amqplib";

const queue = process.argv[2] || "jobsQueue";

async function connect_rabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");

		const channel = await connection.createChannel();

		const assertion = await channel.assertQueue(queue);

		// mesajın alınması
		console.log("Mesajlar Bekleniyor...");
		channel.consume(queue, (message) => {
			console.log("Alınan Mesaj:", message.content.toString());
			channel.ack(message); //gelen mesajın işlendiğini bildiriyoruz bu şekilde mesaj kuyruktan siliniyor.
		});
	} catch (error) {
		console.log("Error:", error);
	}
}

connect_rabbitMQ();
