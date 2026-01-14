import { ApologeticsBotCTA } from '@/components/ApologeticsBotCTA'

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto mb-10 max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 text-deep-indigo">Chat</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Haz preguntas sobre Jesús, la Biblia o la fe cristiana. Si el chat no se abre, asegúrate de que no esté bloqueado por un bloqueador de scripts.
        </p>
      </div>

      <ApologeticsBotCTA />

      <div className="max-w-4xl mx-auto mt-12 text-muted-foreground">
        <h2 className="text-2xl font-semibold text-deep-indigo mb-3">Sugerencias</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Escribe tu pregunta completa (por ejemplo: “¿Por qué existe el mal si Dios es bueno?”).</li>
          <li>Si quieres, comparte tu trasfondo (católico, evangélico, agnóstico, etc.).</li>
          <li>Si pides referencias bíblicas, podemos incluirlas.</li>
        </ul>
      </div>
    </div>
  )
}
