const axios=require("axios")


// Load environment variables from .env file
 // Make sure the path is correct

 async function main(prompt) {
  

  try {
    // Construct the request payload
    const payload = {
      question: prompt,
      chat_history: [],
      knowledge_source_id: "7715939322", // replace with your model id
    };

    // Set the headers
    const headers = {
      "x-api-key": process.env.FLOCK_API_KEY, // Ensure API key is set in .env
    };

    // Send POST request using axios
    const response = await axios.post("https://rag-chat-ml-backend-dev.flock.io/chat/conversational_rag_chat", payload, {
      headers,
    });

    // Output the response data
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}


module.exports=main;