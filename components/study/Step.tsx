// 'use client'

// import { ReactNode } from 'react'
// import { ProgressControls } from './ProgressControls'
// import { usePathname } from 'next/navigation'

// interface StepProps {
//   number: number
//   title: string
//   children: ReactNode
// }

// export function Step({ number, title, children }: StepProps) {
//   const pathname = usePathname()
  
//   // Extract studyId and lessonId from pathname
//   // Format: /estudios/[study]/[lesson]
//   const pathParts = pathname?.split('/').filter(Boolean) || []
//   const studyId = pathParts[1]
//   const lessonId = pathParts[2]

//   return (
//     <div className="my-12 group">
//       <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
//         {/* Header with gradient background */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
//               {number}
//             </div>
//             <h3 className="text-2xl font-bold text-white">{title}</h3>
//           </div>
//         </div>
        
//         {/* Content area with better spacing and typography */}
//         <div className="px-8 py-8 prose prose-lg max-w-none">
//           {children}
//         </div>
        
//         {/* Progress controls at bottom */}
//         <div className="px-8 pb-6">
//           <ProgressControls step={number} studyId={studyId} lessonId={lessonId} />
//         </div>
//       </div>
//     </div>
//   )
// }