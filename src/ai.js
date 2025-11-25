import { HfInference } from '@huggingface/inference'

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getWorkoutPlan(preferences) {
    const { fitnessLevel, equipmentAccess, duration, splits } = preferences
    const splitsString = splits.join(", ")
    
    console.log("Calling API with preferences:", preferences)
    
    const prompt = `Create a detailed workout plan with the following requirements:
- Fitness Level: ${fitnessLevel}
- Equipment Available: ${equipmentAccess}
- Workout Duration: ${duration} minutes
- Target Muscle Groups: ${splitsString}

Please provide:
1. A structured workout routine
2. Specific exercises with sets and reps
3. Rest times between sets
4. Any warm-up or cool-down recommendations

Format the workout plan clearly and make it practical for someone at the ${fitnessLevel} level.`
    
    try {
        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.2-3B-Instruct",
            messages: [
                { role: "user", content: prompt }
            ],
            max_tokens: 1000, // Increased for detailed workout plans
            temperature: 0.7
        })
        
        console.log("API Response:", response)
        console.log(response.choices[0].message.content)
        return response.choices[0].message.content
        
        
    } catch (err) {
        console.error("API Error Details:", err)
        throw err
    }
}