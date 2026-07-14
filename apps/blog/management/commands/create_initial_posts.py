from django.core.management.base import BaseCommand
from apps.blog.models import Post

class Command(BaseCommand):
    help = 'Create initial 3 blog posts for SEO'

    def handle(self, *args, **options):
        posts_data = [
            {
                'slug': 'relaks-meditace-masaz',
                'title_cs': 'Relaxace a meditace: Jak masáž pomáhá najít vnitřní pokoj',
                'title_en': 'Relaxation and Meditation: How Massage Helps Find Inner Peace',
                'title_ru': 'Релаксация и медитация: как массаж помогает найти внутренний мир',
                'excerpt_cs': 'Spojení masáže s mediativními technikami vytváří silný synergický efekt. Naučte se, jak dosáhnout hlubokého vnitřního pokoje a rovnováhy pomocí komplexního wellness přístupu.',
                'excerpt_en': 'The combination of massage with meditative techniques creates a powerful synergistic effect. Learn how to achieve deep inner peace and balance through a comprehensive wellness approach.',
                'excerpt_ru': 'Комбинация массажа с медитативными техниками создает мощный синергетический эффект. Узнайте, как достичь глубокого внутреннего мира и равновесия благодаря комплексному подходу к благополучию.',
                'content_cs': 'V dnešní hektické společnosti se snažíme najít chvíle klidu a vnitřního pokoje. Masáž v kombinaci s meditativními praktikami představuje jednu z nejúčinnějších cest k dosažení této rovnováhy.\n\n## Vědomí a přítomnost\n\nMeditace je starobylá praxe, která nám pomáhá stát se si vědomi přítomného okamžiku a usnadňuje nám vidět věci bez odsudku. Kombinujete-li tuto vědomost s hlubokým fyzickým uvolněním, které přináší masáž, vytváříte ideální prostředí pro transformaci.\n\n## Hluboka relaxace těla\n\nBěhem masáže se vaše tělo postupně uvolňuje, napětí se rozpouští a svalová pamět se "resetuje". Tímto procesem se vaše mysl také přirozeně usadí.\n\n## Aktivace parasympatického nervového systému\n\nNáš autonomní nervový systém má dvě hlavní režimy: sympatický (boj nebo útěk) a parasympatický (odpočinek a regenerace). V moderní společnosti jsme často v sympatickém režimu. Masáž a meditace nás přesouvají do parasympatického režimu, kde se opravdu uzdravujeme.',
                'content_en': 'In today\'s hectic society, we strive to find moments of peace and inner tranquility. Massage combined with meditative practices represents one of the most effective paths to achieving this balance.\n\n## Awareness and Presence\n\nMeditation is an ancient practice that helps us become aware of the present moment and enables us to see things without judgment. When you combine this awareness with the deep physical relaxation that massage provides, you create an ideal environment for transformation.\n\n## Deep Body Relaxation\n\nDuring a massage, your body gradually relaxes, tension dissolves, and muscle memory is "reset." Through this process, your mind naturally settles as well.\n\n## Activation of the Parasympathetic Nervous System\n\nOur autonomic nervous system has two main modes: sympathetic (fight or flight) and parasympathetic (rest and recovery). In modern society, we\'re often in sympathetic mode. Massage and meditation shift us into parasympathetic mode, where true healing occurs.',
                'content_ru': 'В современном хаотичном обществе мы пытаемся найти моменты мира и внутренней гармонии. Массаж в сочетании с медитативными практиками представляет собой один из самых эффективных путей достижения этого баланса.\n\n## Осознанность и присутствие\n\nМедитация - это древняя практика, которая помогает нам осознать настоящий момент и позволяет видеть вещи без суждения. Когда вы сочетаете эту осознанность с глубокой физической релаксацией, которую обеспечивает массаж, вы создаете идеальную среду для трансформации.\n\n## Глубокая релаксация тела\n\nВо время массажа ваше тело постепенно расслабляется, напряжение растворяется, и мышечная память "перезагружается". Благодаря этому процессу ваш ум естественно успокаивается.'
            },
            {
                'slug': 'spa-retreat-kompletni-pruvodce',
                'title_cs': 'Wellness Retreat: Kompletní průvodce regeneračním víkendem',
                'title_en': 'Wellness Retreat: Complete Guide to a Restorative Weekend',
                'title_ru': 'Спа-ретрит: полное руководство к восстановительному выходному',
                'excerpt_cs': 'Plánujete si wellness víkend? Naučte se, jak si maximálně užít spa ošetření, včetně tipů pro přípravu, výběr správných procedur a péče po masáži.',
                'excerpt_en': 'Planning a wellness weekend? Learn how to maximize your spa experience, including preparation tips, choosing the right treatments, and post-massage care.',
                'excerpt_ru': 'Планируете спа-выходные? Узнайте, как максимально насладиться спа-процедурами, включая советы по подготовке, выбору правильных процедур и уходу после массажа.',
                'content_cs': 'Spa víkend nebo wellness RetReat není luxus, ale investice do vašeho zdraví a pohody. V tomto průvodci vám ukážeme, jak si zprostředkovat nejen nejlepší massage, ale celou transformační zkušenost.\n\n## Příprava na spa víkend\n\nVíkend do spa by měl začít několik dní předem.\n\n## Výběr správných procedur\n\nV Black Elixir Spa nabízíme různé typy masáží.\n\n## Během masáže\n\nBěhem samotné masáže se snažte zcela se uvolnit a komunikujte s terapeautem.\n\n## Po masáži - péče a regenerace\n\nPéče po masáži je stejně důležitá jako sama masáž. Dejte si čas na odpočinek a hydrataci.\n\n## Speciální balíčky pro víkend\n\nNabízíme speciální balíčky pro wellness víkendy včetně Couples Retreat a Solo Retreat.\n\n## Závěr\n\nWellness víkend je výjimečná příležitost, jak se vrátit k sobě a znovu se připojit se svým tělem.',
                'content_en': 'A spa weekend or wellness retreat is not a luxury, but an investment in your health and well-being. In this guide, we\'ll show you how to experience not just the best massage, but an entire transformational experience.\n\n## Preparing for a Spa Weekend\n\nA spa weekend should begin several days in advance. Start drinking more water and prefer lighter food.\n\n## Choosing the Right Treatments\n\nAt Black Elixir Spa, we offer various types of massages tailored to your needs.\n\n## During the Massage\n\nDuring the massage itself, try to fully relax and communicate with your therapist.\n\n## After Massage - Care and Recovery\n\nPost-massage care is as important as the massage itself. Rest and hydrate properly.\n\n## Special Packages for the Weekend\n\nWe offer special packages for wellness weekends including Couples Retreat and Solo Retreat.\n\n## Conclusion\n\nA wellness weekend is an exceptional opportunity to return to yourself and reconnect with your body.',
                'content_ru': 'Спа-выходные или wellness-ретрит - это не роскошь, а инвестирование в ваше здоровье и благополучие. В этом руководстве мы покажем вам, как испытать не просто лучший массаж, но целостный трансформационный опыт.\n\n## Подготовка к спа-выходным\n\nСпа-выходные должны начинаться несколько дней назад. Начните пить больше воды и отдавайте предпочтение легкой пище.\n\n## Выбор правильных процедур\n\nВ Black Elixir Spa мы предлагаем различные виды массажа.\n\n## Во время массажа\n\nВо время самого массажа старайтесь полностью расслабиться.\n\n## После массажа\n\nУход после массажа очень важен. Отдохните и гидратируйтесь.\n\n## Специальные пакеты\n\nМы предлагаем специальные пакеты для спа-выходных.\n\n## Заключение\n\nСпа-выходной - это исключительная возможность вернуться к себе.'
            }
        ]

        for post_data in posts_data:
            post, created = Post.objects.update_or_create(
                slug=post_data['slug'],
                defaults={
                    'title_cs': post_data['title_cs'],
                    'title_en': post_data['title_en'],
                    'title_ru': post_data['title_ru'],
                    'excerpt_cs': post_data['excerpt_cs'],
                    'excerpt_en': post_data['excerpt_en'],
                    'excerpt_ru': post_data['excerpt_ru'],
                    'content_cs': post_data['content_cs'],
                    'content_en': post_data['content_en'],
                    'content_ru': post_data['content_ru'],
                    'is_published': True,
                }
            )
            status = "Created" if created else "Updated"
            self.stdout.write(self.style.SUCCESS(f'{status} post: {post.title_cs}'))
