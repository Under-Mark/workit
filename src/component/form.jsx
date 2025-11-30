import { useState, useEffect } from "react"
import { getWorkoutPlan } from "../ai"
import WorkoutDisplay from "./generatedplan"
import { 
    Dumbbell,     
    Zap,          
    Mountain,     
    Heart,        
    CircleDot,    
    Box,           
    Shield,        
    Target,
    TrendingUp,
    Wrench,
    Clock,
    Activity,    
    XCircle,
    CheckCircle,
    ArrowDownCircle
} from 'lucide-react'
export default function Form() {
    const [workoutSplit, setWorkoutSplit] = useState([])
    const [workoutPlan, setworkoutPlan] = useState("")
    
    const [fitnessLevel, setFitnessLevel] = useState("")
    const [equipmentAccess, setEquipmentAccess] = useState("")
    const [duration, setDuration] = useState("")
    const [loading,setLoading] = useState(false)
    const [complete,setComplete] = useState(false)
    const splitTypes = [
        { name: "Triceps", icon: Dumbbell },
        { name: "Biceps", icon: Zap },
        { name: "Legs", icon: Mountain },
        { name: "Cardio", icon: Heart },
        { name: "Core", icon: Activity },
        { name: "Shoulders", icon: CircleDot },
        { name: "Back", icon: Box },
        { name: "Chest", icon: Shield },
        { name: "FullBody", icon: Target }
    ]
 
    function clearForm() {
        setFitnessLevel("")
        setEquipmentAccess("")
        setDuration("")
        setWorkoutSplit([])
        setworkoutPlan("")
        setLoading(false)
        setComplete(false)
    }
    function loadingFunc(){
        if (fitnessLevel && equipmentAccess && duration && workoutSplit.length !== 0) {
                setLoading(true)
        }
        
        console.log(loading, "testing loading")
    }
    function toggleSplit(split) {
        setWorkoutSplit(prev => 
            prev.includes(split)
                ? prev.filter(s => s !== split)
                : [...prev, split]
        )
    }
    function SplitButton({ split, icon: Icon }) {
        const isSelected = workoutSplit.includes(split)
        return (
            <button
                type="button"
                onClick={() => toggleSplit(split)}
                className={`cursor-pointer p-3 rounded-lg border-2 transition-all text-xs font-medium flex flex-col items-center gap-2 ${
                    isSelected
                        ? 'border-orange-600 bg-gray-700 text-white shadow-md scale-105 font-bold'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-orange-400 hover:scale-102'
                }`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-600' : 'text-gray-500'}`} />
                <span>{split}</span>
            </button>
        )
    }
    async function HandleSubmit(formData) {
        console.log("Form Submitted")
        
      
        if (!fitnessLevel || !equipmentAccess || !duration || workoutSplit.length === 0) {
            alert("Please fill in all fields and select at least one muscle group")
            
            return
        }
        
        console.log({ fitnessLevel, equipmentAccess, duration, splits: workoutSplit })
        
        setworkoutPlan("")
        
        try {
            const plan = await getWorkoutPlan({ 
                fitnessLevel,
                equipAccess: equipmentAccess,
                duration,
                splits: workoutSplit 
            })
            setLoading(false)
            setworkoutPlan(plan)
            setComplete(true)
        } catch (err) {
            console.error("Error generating workout plan:", err)
            setworkoutPlan("Failed to generate workout plan. Please try again.")
        }
    }
    return (
        <>
        <main className="min-h-screen flex flex-col sm:flex-row bg-gray-950 mt-5" id="workout-form">
            <div className="sm:w-1/2">
                <img
                    src="form-bg.png"
                    alt="Fitness background"
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="flex w-full sm:w-1/2 items-center justify-center bg-orange-600 p-8">
                <form className="w-full max-w-lg p-8 text-white" action={HandleSubmit}>
                    <h1 className="text-center font-bold text-3xl text-white mb-2">
                        Your Preferences
                    </h1>
                    <p className="text-center text-orange-100 text-sm mb-8">
                        Customize your perfect workout
                    </p>
                    <div className="mb-6">
                        <label
                            htmlFor="fitnessLevel"
                            className="block text-sm font-semibold mb-2 text-white flex items-center gap-2"
                        >
                            <TrendingUp className="w-5 h-5" />
                            Fitness Level
                        </label>
                        
                        <select
                            name="fitnessLevel"
                            value={fitnessLevel}
                            onChange={(e) => setFitnessLevel(e.target.value)}
                            className={`w-full rounded-lg border-2 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition ${
                                fitnessLevel 
                                    ? 'bg-gray-700 text-white border-orange-600 font-semibold' 
                                    : 'bg-white text-gray-800 border-orange-400'
                            }`}
                        >
                            <option value="">Choose your level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="equipmentAccess"
                            className="block text-sm font-semibold mb-2 text-white flex items-center gap-2"
                        >
                            <Wrench className="w-5 h-5" />
                            Equipment Access
                        </label>
                        <select
                            name="equipmentAccess"
                            value={equipmentAccess}
                            onChange={(e) => setEquipmentAccess(e.target.value)}
                            className={`w-full rounded-lg border-2 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition ${
                                equipmentAccess 
                                    ? 'bg-gray-700 text-white border-orange-600 font-semibold' 
                                    : 'bg-white text-gray-800 border-orange-400'
                            }`}
                        >
                            <option value="">Choose equipment</option>
                            <option value="gym">Full Gym Equipment</option>
                            <option value="home">Home Gym</option>
                            <option value="none">No Equipment (Bodyweight)</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="duration"
                            className="block text-sm font-semibold mb-2 text-white flex items-center gap-2"
                        >
                            <Clock className="w-5 h-5" />
                            Workout Duration (Minutes)
                        </label>
                        <input 
                            type="number" 
                            name="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g., 45"
                            min="10"
                            max="180"
                            className={`w-full rounded-lg border-2 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 transition ${
                                duration 
                                    ? 'bg-gray-700 text-white border-orange-600 font-semibold placeholder:text-gray-400' 
                                    : 'bg-white text-gray-800 border-orange-400'
                            }`}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-3 text-white flex gap-2 items-center">
                            <Target className="w-5 h-5"/>
                            Target Muscle Groups
                            <span className="text-xs font-normal text-orange-100 ml-2">(select one or more)</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {splitTypes.map((split) => (
                                <SplitButton key={split.name} split={split.name} icon={split.icon} />
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
    <button 
        className="flex-1 text-white py-3 rounded-lg font-bold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        onClick={clearForm} 
        type="button"
    >
        <XCircle className="w-5 h-5" />
        Clear
    </button>
    
    <button
        type="submit"
        className="flex-[2] text-white font-bold py-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700 hover:from-orange-500 hover:to-orange-400 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden group"
        onClick={loadingFunc}
    >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CheckCircle className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Lock In & Generate</span>
    </button>
</div>

{loading ? (
    <div className="mt-6 flex justify-center items-center space-x-3 text-white bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border-2 border-orange-500/30">
        <svg
            className="animate-spin h-6 w-6 text-orange-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
            ></path>
        </svg>
        <span className="font-semibold text-orange-300">Generating your perfect workout...</span>
    </div>
) : null}

{complete ?     
<div className="mt-6 flex justify-center items-center space-x-3 text-white bg-gray-800 rounded-lg p-4 border-2 border-orange-500/30">
    <ArrowDownCircle className="w-5 h-5"/>
        <span className="font-semibold text-white"> Workout generated, scroll to view</span>
    </div>
:null}
                   
                  
                </form>
            </div>
        </main>
        
        <WorkoutDisplay 
            workoutPlan={workoutPlan} 
            onClear={() => setworkoutPlan("")}
        />
        </>
    )
}