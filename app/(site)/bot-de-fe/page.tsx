import { Hero } from '@/components/Hero'
import { CallToAction } from '@/components/CallToAction'
import { BotDeFeChat } from '@/components/bot/BotDeFeChat'

export default function BotDeFePage() {
	return (
		<div>
			<Hero
				title="Bot de Fe"
				subtitle="Haz preguntas sobre la fe cristiana y apologética, y recibe una respuesta clara y respetuosa."
				variant="jesus"
			/>

			<main className="container mx-auto px-4 py-12">
				<div className="mx-auto mb-10 max-w-4xl">
					<h2 className="text-3xl md:text-4xl font-bold text-deep-indigo">Pregunta lo que quieras</h2>
					<p className="mt-3 text-lg text-muted-foreground leading-relaxed">
						Este chat está diseñado para ayudarte a explorar preguntas honestas: Dios, el sufrimiento, la confiabilidad de la Biblia, Jesús y el evangelio.
					</p>
				</div>

				<BotDeFeChat />
			</main>

			<CallToAction
				title="¿Quieres dar el siguiente paso?"
				subtitle="Si estás explorando la fe, podemos ayudarte a empezar, encontrar una iglesia cercana o hablar con alguien."
				actions={[
					{ href: '/comienza-aqui/primeros-pasos', label: 'Comienza aquí', variant: 'primary' },
					{ href: '/comunidad/encuentra-iglesia', label: 'Encontrar una iglesia', variant: 'accent' },
					{ href: '/encuentra-ayuda', label: 'Pedir ayuda', variant: 'ghost' },
				]}
			/>
		</div>
	)
}
