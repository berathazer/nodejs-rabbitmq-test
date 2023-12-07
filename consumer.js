import amqp from "amqplib";
import data from "./data.json" assert { type: "json" };

const queue = process.argv[2] || "jobsQueue";

async function connect_rabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");

		const channel = await connection.createChannel();

		await channel.assertQueue(queue);

		console.log("Mesajlar Bekleniyor...");

		channel.consume(queue, (message) => {
			const { description: userId } = JSON.parse(message.content.toString());
			const user = data.find((user) => user.id === userId);

			if (user) {
				console.log("Bulunan Kullanıcı:", user);
				channel.ack(message);
			}
		});

		//setIntervalli publisher için
		/* channel.consume(queue, (message) => {
			console.log("Alınan Mesaj:", message.content.toString());
			channel.ack(message); //gelen mesajın işlendiğini bildiriyoruz bu şekilde mesaj kuyruktan siliniyor.
		}); */
		//setIntervalli publisher için
	} catch (error) {
		console.log("Error:", error);
	}
}

connect_rabbitMQ();
