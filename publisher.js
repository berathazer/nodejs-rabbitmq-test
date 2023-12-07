import amqp from "amqplib";

const message = {
	description: "Test mesajı.",
};

async function connect_rabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");

		const channel = await connection.createChannel();

		const queue = "jobsQueue";

		const assertion = await channel.assertQueue(queue);

		channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

		console.log("Gönderilen mesaj:", message);
	} catch (error) {
		console.log("Error:", error);
	}
}

connect_rabbitMQ();
