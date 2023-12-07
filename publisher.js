import amqp from "amqplib";
import data from "./data.json" assert { type: "json" };

const message = {
	description: "Test mesajı.",
};

const queue = process.argv[2] || "jobsQueue";

async function connect_rabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");

		const channel = await connection.createChannel();

		await channel.assertQueue(queue);

		data.forEach((item) => {
			message.description = item.id;
			channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
			console.log("Gönderilen mesaj:", item.id);
		});
		// setInterval Kısmı
		/* setInterval(() => {
				message.description = new Date().getTime();
				channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
				console.log("Gönderilen mesaj:", message);
			}, 10);
		*/
		// setInterval Kısmı
	} catch (error) {
		console.log("Error:", error);
	}
}

connect_rabbitMQ();
