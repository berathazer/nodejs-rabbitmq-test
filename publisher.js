import amqp from "amqplib";

const message = {
	description: "Test mesajı.",
};

const queue = process.argv[2] || "jobsQueue";

async function connect_rabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");

		const channel = await connection.createChannel();

		await channel.assertQueue(queue);

		setInterval(() => {
			message.description = new Date().getTime();
			channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
			console.log("Gönderilen mesaj:", message);
		}, 10);
	} catch (error) {
		console.log("Error:", error);
	}
}

connect_rabbitMQ();
