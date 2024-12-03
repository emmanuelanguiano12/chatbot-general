export async function invokeModel(userMessage: string) {
    const apiEndpoint = process.env.NEXT_PUBLIC_URL_CHAT;
  
    try {
      const response = await fetch(apiEndpoint!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_message: userMessage }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.response; // Respuesta del modelo
    } catch (error) {
      console.error("Error invocando el modelo:", error);
      throw error;
    }
  }
  