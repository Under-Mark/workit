import { useState } from "react"
import { getWorkoutPlan } from "../ai"
import ReactMarkdown from 'react-markdown'
import { 
    Dumbbell,     
    Zap,          
    Mountain,     
    Heart,       
    Hand,        
    CircleDot,    
    Box,           
    Shield,        
    Target,
    TrendingUp,    // Fitness Level
    Wrench,        // Equipment Access
    Clock,         // Duration
          
} from 'lucide-react'

export default function Form() {
     const [workoutSplit, setWorkoutSplit] = useState([])
    const [workoutPlan, setworkoutPlan] = useState("")
    const [loading, setLoading] = useState(false)
    
    // Add state to track filled inputs
    const [fitnessLevel, setFitnessLevel] = useState("")
    const [equipmentAccess, setEquipmentAccess] = useState("")
    const [duration, setDuration] = useState("")

    const splitTypes = [
        { name: "Triceps", icon: Dumbbell },
        { name: "Biceps", icon: Zap },
        { name: "Legs", icon: Mountain },
        { name: "Cardio", icon: Heart },
        { name: "Forearms", icon: Hand },
        { name: "Shoulders", icon: CircleDot },
        { name: "Back", icon: Box },
        { name: "Chest", icon: Shield },
        { name: "FullBody", icon: Target }
    ]

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
                className={`p-3 rounded-lg border-2 transition-all text-xs font-medium flex flex-col items-center gap-2 ${
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
        const fitnessLevel = formData.get("fitnessLevel")
        const equipAccess = formData.get("equipmentAccess")
        const duration = formData.get("duration")
        
        console.log({ fitnessLevel, equipAccess, duration, splits: workoutSplit })
        
        setLoading(true)
        setworkoutPlan("")
        
        try {
            const plan = await getWorkoutPlan({ 
                fitnessLevel, 
                equipAccess, 
                duration, 
                splits: workoutSplit 
            })
            setworkoutPlan(plan)
        } catch (err) {
            console.error("Error generating workout plan:", err)
            setworkoutPlan("Failed to generate workout plan. Please try again.")
        } finally {
            setLoading(false)
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
            <label className="block text-sm font-semibold mb-3 text-white flex ">
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

        <button
            type="submit"
            disabled={loading}
            className="w-full  text-white font-bold py-3 rounded-lg hover:bg-orange-200 hover:text-gray-700 transition-all disabled:bg-gray-300 disabled:text-gray-500 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 mt-4 bg-gray-700"
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2 ">
                    <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin "></div>
                    Generating Your Plan...
                </span>
            ) : (
                "Lock In & Generate"
            )}
        </button>
    </form>
</div>

        </main>
        
       {workoutPlan && (
    <section className="max-w-6xl mx-auto p-8 mt-12 mb-12">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 rounded-3xl shadow-2xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl opacity-10"></div>
            
            {/* Header Banner */}
            <div className="relative p-10 border-b border-orange-500/30">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Dumbbell className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-black text-white tracking-tight">
                                Your Workout Plan
                            </h2>
                        </div>
                        <p className="text-orange-200 text-md ml-15">Customized for maximum gains</p>
                    </div>
                    <div className="hidden lg:block">
                       <div className="w-30"><img src="workit-logo-orange.png" alt="" /></div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative p-10 bg-white/5 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <ReactMarkdown
                        components={{
                            h1: ({node, ...props}) => (
                                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-6 mt-8" {...props} />
                            ),
                            h2: ({node, ...props}) => (
                                <div className="relative bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-5 mb-6 mt-8 border-l-8 border-orange-500 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-orange-500 rounded-full"></div>
                                    <h2 className="text-2xl font-bold text-gray-800" {...props} />
                                </div>
                            ),
                            h3: ({node, ...props}) => (
                                <h3 className="text-xl font-bold text-orange-600 mb-3 mt-6 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                                    {props.children}
                                </h3>
                            ),
                            p: ({node, ...props}) => (
                                <p className="mb-4 text-gray-700 leading-relaxed text-base" {...props} />
                            ),
                            ul: ({node, ...props}) => (
                                <ul className="space-y-3 ml-4 mb-6" {...props} />
                            ),
                            li: ({node, ...props}) => (
                                <li className="text-gray-700 leading-relaxed flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 hover:border-l-4 hover:border-orange-500 transition-all group">
                                    <span className="text-orange-500 font-black text-xl mt-0.5 group-hover:scale-110 transition-transform">▸</span>
                                    <span className="flex-1" {...props} />
                                </li>
                            ),
                            strong: ({node, ...props}) => (
                                <strong className="font-black text-orange-600 bg-gradient-to-r from-orange-100 to-orange-50 px-2 py-0.5 rounded shadow-sm" {...props} />
                            ),
                            ol: ({node, ...props}) => (
                                <ol className="space-y-4 ml-6 mb-6 counter-reset" {...props} />
                            )
                        }}
                    >
                        {workoutPlan}
                    </ReactMarkdown>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-8 border-t border-orange-500/30">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-orange-300" />
                        </div>
                        <div>
                            <p className="text-orange-300 text-sm font-semibold">PRO TIP</p>
                            <p className="text-white font-medium">Warm up properly & stay hydrated!</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setworkoutPlan("")}
                            className="group px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-bold hover:scale-105 active:scale-95"
                        >
                            <span className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Generate New
                            </span>
                        </button>
                       
                    </div>
                </div>
            </div>
        </div>
    </section>
)}
        </>
    )
}