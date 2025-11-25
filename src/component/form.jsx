import { useState } from "react"
import { getWorkoutPlan } from "../ai"
export default function Form() {

    const [workoutSplit, setWorkoutSplit] = useState([])

    const splitTypes = [
        "Triceps","Biceps","Legs","Cardio","Arms","Shoulders","Back","Chest","FullBody"
    ]

    // add and remove split workout
    function toggleSplit(split) {
        setWorkoutSplit(prev => 
            prev.includes(split)
                ? prev.filter(s => s !== split)
                : [...prev, split]
        )
    }

    function SplitButton({ split }) {
        const isSelected = workoutSplit.includes(split)
        return (
            <button
                type="button"
                onClick={() => toggleSplit(split)}
                className={`p-2 rounded-md border-2 transition-all text-xs font-medium ${
                    isSelected
                        ? 'border-orange-600 bg-orange-50 text-orange-600'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-orange-400'}`}>
                {split}
            </button>
        )
    }

    async function HandleSubmit(formData) {
        console.log("Form Submitted")
        const fitnessLevel = formData.get("fitnessLevel")
        const equipAccess = formData.get("equipmentAccess")
        const duration = formData.get("duration")
        const splits = formData.getAll("workoutSplit")
        console.log({ fitnessLevel, equipAccess, duration, splits })
        getWorkoutPlan({ fitnessLevel, equipAccess, duration, splits })
    }

    return (
        <main className="min-h-screen flex flex-col sm:flex-row bg-gray-950">
            <div className="sm:w-1/2">
                <img
                    src="form-bg.png"
                    alt="Fitness background"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex w-full sm:w-1/2 items-center justify-center bg-orange-600">
                <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-8" action={HandleSubmit}>
                    <h1 className="text-center font-bold text-2xl text-orange-600 mb-6">
                        Your Preferences
                    </h1>

                    <div className="mb-5">
                        <label
                            htmlFor="fitnessLevel"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Fitness Level
                        </label>
                        <select
                            name="fitnessLevel"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Choose</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="equipmentAccess"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Equipment Access
                        </label>
                        <select
                            name="equipmentAccess"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Choose</option>
                            <option value="gym">Gym Equipment</option>
                            <option value="home">Home Gym</option>
                            <option value="none">No Equipment</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                            Workout Duration (mins):
                        </label>
                        <input 
                            type="number" 
                            name="duration" 
                            className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Workout Split <span className="text-xs text-gray-500">(select multiple)</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {splitTypes.map((split) => (
                                <SplitButton key={split} split={split} />
                            ))}
                        </div>
                        {workoutSplit.map((split) => (
                            <input
                                key={split}
                                type="hidden"
                                name="workoutSplit"
                                value={split}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-700 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        Lock In
                    </button>
                </form>
            </div>
        </main>
    )
}