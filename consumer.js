import amqp from "amqplib";

async function connect_rabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");

		const channel = await connection.createChannel();

		const queue = "jobsQueue";

		const assertion = await channel.assertQueue(queue);

		// mesajın alınması

		channel.consume(queue, (message) => {
			console.log("Message:", message.content.toString());
			channel.ack(message); //gelen mesajın işlendiğini bildiriyoruz bu şekilde mesaj kuyruktan siliniyor.
		});
	} catch (error) {
		console.log("Error:", error);
	}
}

connect_rabbitMQ();
