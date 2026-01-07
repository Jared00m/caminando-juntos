// 'use client'

// import { ReactNode } from 'react'

// interface DevotionalLessonProps {
//   children: ReactNode
// }

// export function DevotionalLesson({ children }: DevotionalLessonProps) {
//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <article className="prose prose-lg prose-gray max-w-none">
//         {children}
//       </article>
//     </div>
//   )
// }

// interface SectionProps {
//   children: ReactNode
//   variant?: 'default' | 'story' | 'reflection' | 'scripture' | 'truth'
// }

// export function Section({ children, variant = 'default' }: SectionProps) {
//   const variants = {
//     default: 'my-8',
//     story: 'my-8 bg-amber-50 border-l-4 border-amber-400 p-8 rounded-r-xl',
//     reflection: 'my-8 bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-xl',
//     scripture: 'my-12 text-center',
//     truth: 'my-8 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border-2 border-green-200'
//   }

//   return (
//     <div className={variants[variant]}>
//       {children}
//     </div>
//   )
// }

// export function ScriptureVerse({ children, reference }: { children: ReactNode, reference: string }) {
//   return (
//     <div className="my-12 max-w-2xl mx-auto">
//       <div className="relative">
//         <div className="absolute -left-4 top-0 text-6xl text-blue-200 font-serif">"</div>
//         <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed text-center px-8 py-6">
//           {children}
//         </blockquote>
//         <div className="absolute -right-4 bottom-0 text-6xl text-blue-200 font-serif">"</div>
//       </div>
//       <p className="text-center text-sm font-semibold text-gray-600 mt-4">— {reference}</p>
//     </div>
//   )
// }

// export function Thought({ children }: { children: ReactNode }) {
//   return (
//     <div className="my-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-400">
//       <div className="flex gap-3">
//         <span className="text-2xl">💭</span>
//         <div className="flex-1 text-gray-700 leading-relaxed">
//           {children}
//         </div>
//       </div>
//     </div>
//   )
// }

// export function TakeAway({ children }: { children: ReactNode }) {
//   return (
//     <div className="my-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-xl">
//       <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
//         <span className="text-3xl">💡</span>
//         Para Recordar
//       </h3>
//       <div className="text-lg leading-relaxed text-blue-50">
//         {children}
//       </div>
//     </div>
//   )
// }

// export function Question({ children }: { children: ReactNode }) {
//   return (
//     <div className="my-8 bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
//       <div className="flex gap-3">
//         <span className="text-2xl flex-shrink-0">🤔</span>
//         <div className="flex-1">
//           <p className="font-semibold text-gray-900 mb-2">Pausa para reflexionar:</p>
//           <div className="text-gray-700 leading-relaxed">
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
