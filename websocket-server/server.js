const WebSocket = require("ws");
const axios = require("axios");
require("dotenv").config();

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (message) => {
    console.log("Received:", message);

    try {
      const userMessage = message.toString();
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", //if you have access to it
          messages: [{ role: "user", content: userMessage }],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization:
              "Bearer sk-proj-lJqONKZhNeQvmg4bmLZWT3BlbkFJRFfoyHUJ0VOs9qGi3gqP", //`Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        const aiMessage = response.data.choices[0].message?.content?.trim();
        if (aiMessage) {
          ws.send(JSON.stringify({ text: aiMessage, sender: "bot" }));
        } else {
          ws.send(
            JSON.stringify({
              text: "Error: Invalid response structure from AI",
              sender: "bot",
            })
          );
        }
      } else {
        ws.send(
          JSON.stringify({
            text: "Error: No choices in response from AI",
            sender: "bot",
          })
        );
      }
    } catch (error) {
      console.error(
        "Error fetching response from API",
        error.response ? error.response.data : error.message
      );
      ws.send(
        JSON.stringify({
          text: "Error: Could not retrieve response from AI",
          sender: "bot",
        })
      );
    }
  });

  //       const aiMessage = response.data.choices[0].message.content.trim();
  //       ws.send(JSON.stringify({ text: aiMessage, sender: "bot" }));
  //     } catch (error) {
  //       console.error(
  //         "Error fetching response from API",
  //         error.response ? error.response.data : error.message
  //       );
  //       ws.send(
  //         JSON.stringify({
  //           text: "Error: Could not retrieve response from AI",
  //           sender: "bot",
  //         })
  //       );
  //     }
  //   });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
