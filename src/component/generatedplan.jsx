import ReactMarkdown from 'react-markdown'
import { 
    Dumbbell,
    Heart,
    Target
} from 'lucide-react'

export default function WorkoutDisplay({ workoutPlan, onClear }) {
    if (!workoutPlan) return null

    return (
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
                            <div className="w-30"><img src="workit-logo-orange.png" alt="Workit Logo" /></div>
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
                                onClick={onClear}
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
    )
}