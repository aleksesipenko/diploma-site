// ============================================================================
// SSOT (Single Source of Truth) ДЛЯ ДАННЫХ ОБ LLM В ЭТОМ ПРОЕКТЕ РАСПОЛОЖЕН ПО АДРЕСУ:
// /Users/alexesip/Desktop/диплом/КОНФЕРЕНЦИЯ/АКТУАЛЬНЫЕ_LLM.md
//
// ВАЖНО: Любые изменения в характеристиках моделей, статусах или их описании 
// должны СНАЧАЛА вноситься в указанный markdown-файл, и только затем обновляться здесь!
// Данный файл служит исключительно для форматирования информации из SSOT в удобный 
// для UI (React) вид.
// ============================================================================

// ============================================================================

export type LlmCategory = 'primary' | 'secondary' | 'russian_opensource';

export interface LlmProfile {
    id: string;
    name: string;
    shortName: string;
    status: string;
    category: LlmCategory;
    badges: string[];
    contextWindow: string;
    shortDescription: string; // Для тултипов
    fullDescription: string; // Для страницы моделей
    roleInThesis: string;
    futurePlansNote?: string; // Комментарий про планируемые тесты в будущем
    color: string; // Tailwind color class for badges/accents
}

export const llmProfiles: Record<string, LlmProfile> = {
    'claude-4.6-opus': {
        id: 'claude-4.6-opus',
        name: 'Claude 4.6 Opus',
        shortName: 'Claude 4.6',
        status: 'Флагман Anthropic. Релиз 5 февраля 2026 года.',
        category: 'primary',
        badges: ['Adaptive Thinking', 'Generalist', 'SOTA'],
        contextWindow: 'Стандартное 200k, бета до 1M токенов (с функцией "compaction"). Выход до 128k.',
        shortDescription: 'Абсолютный лидер в мире по комплексному анализу, агентной работе (до 14,5 часов) и созданию глубоких "литературных" текстов.',
        fullDescription: 'На сегодняшний день это объективно лучшая модель в мире для комплексного анализа, длинного горизонта планирования и автономной агентной работы. Инновационная система Adaptive Thinking (уровни low, medium, high, max) позволяет модели достигать рекордов (68.8% в ARC AGI 2) за счет автономного рассуждения над сверхсложными задачами.',
        roleInThesis: 'Главный инструмент для тестов глубокого художественного стиля, сохранения тонкой стилистики и наиболее сложных трансформационных задач перевода, требующих обширного анализа фоновых знаний.',
        color: 'amber'
    },
    'gemini-3.1-pro': {
        id: 'gemini-3.1-pro',
        name: 'Gemini 3.1 Pro',
        shortName: 'Gemini 3.1',
        status: 'Релиз 19 февраля 2026 года. Флагман линейки Gemini 3.',
        category: 'primary',
        badges: ['Multimodal King', 'Google DeepMind'],
        contextWindow: 'Вход: 1,048,576 токенов (1M). Выход: 65,536 токенов.',
        shortDescription: 'Безоговорочный лидер в мультимодальности (картинки, видео, звук). Рекордсмен с огромным выходным окном (65k токенов).',
        fullDescription: 'Модель способна обрабатывать до 900 изображений за промпт, 8.4 часа аудио или 1 час непрерывного видео. Впервые реализована генерация динамических интерактивных SVG/UI элементов прямо из промпта. Сделан гигантский скачок в запуске и поддержке агентных воркфлоу.',
        roleInThesis: 'Эталон машинного перевода с учетом мультимодального контекста. Идеальна для прогона длинных датасетов за один запрос благодаря мега-окну в миллион токенов на вход.',
        color: 'blue'
    },
    'gpt-5.2': {
        id: 'gpt-5.2',
        name: 'GPT-5.2',
        shortName: 'GPT-5.2',
        status: 'Релиз 11 декабря 2025 (заменил версии GPT-5 и GPT-5.1).',
        category: 'primary',
        badges: ['Advanced Reasoning', 'OpenAI Flagship'],
        contextWindow: 'Почти 100% точность поиска на окне в 256k токенов.',
        shortDescription: 'Универсальная контрольная модель OpenAI. Значительное ускорение работы и радикальное снижение галлюцинаций в логике.',
        fullDescription: 'Унификация глубокого логического рассуждения (advanced reasoning) и блестящего понимания ультра-длинного контекста. Предлагает мощный инструментарий: Pro, Thinking, Codex и Instant версии. В 11 раз быстрее человеческих экспертов решает сложные бизнес-задачи.',
        roleInThesis: 'Контрольная модель и основной конкурент в тестах на общую адекватность перевода и качество выстраивания сложных логических цепочек в научном тексте.',
        color: 'emerald'
    },
    'gigachat-2-max': {
        id: 'gigachat-2-max',
        name: 'GigaChat 2 Max',
        shortName: 'GigaChat',
        status: 'Флагман Сбера (линейка 2.0 / Max). Актуален на 2026 год.',
        category: 'primary',
        badges: ['Localization', 'Russian Enterprise'],
        contextWindow: '128K токенов (до 200 страниц A4).',
        shortDescription: 'Отечественный ИИ с глубочайшим пониманием российской специфики, культурного кода, терминологии и канцелярита.',
        fullDescription: 'Хотя глобально он может уступать западным гигантам в чистой абстрактной логике, его "суперсила" кроется в патриотичной фокусировке: абсолютное 1 место в бенчмарке MERA. Обладает глубочайшим пониманием локального российского дискурса (юридического, бюрократического), недоступным иностранным сетям.',
        roleInThesis: 'Выступает в роли "локального эксперта". Демонстрация того, что отечественный ИИ может лучше адаптировать (локализовать) культурно-специфичные реалии и сложные русизмы.',
        color: 'green'
    },
    'yandexgpt-5.1-pro': {
        id: 'yandexgpt-5.1-pro',
        name: 'YandexGPT 5.1 Pro',
        shortName: 'YandexGPT',
        status: 'Флагман Яндекса для бизнес-задач (2025–2026).',
        category: 'primary',
        badges: ['RAG Precision', 'Strict Formatting'],
        contextWindow: 'До 32,000 токенов (оптимизировано под сверхточные RAG).',
        shortDescription: 'Жесткое следование системным промптам бота, отсутствие галлюцинаций при RAG, и нативный встроенный Code Interpreter Python.',
        fullDescription: 'В отличие от других локальных решений, YandexGPT 5.1 Pro делает ставку на безупречное следование системным промптам (System Prompts) и работу с документами в базах знаний без галлюцинаций. Поддерживает запуск Python-кода(Code Interpreter) для аналитики прямо в чате.',
        roleInThesis: 'Исследование жесткого промптинга. Модель идеальна для тестов, требующих строгого форматирования ответа ("переведи точно по списку из 5 пунктов, не добавляя отсебятину").',
        color: 'red'
    },
    'translategemma-12b': {
        id: 'translategemma-12b',
        name: 'TranslateGemma 12B/4B',
        shortName: 'TranslateGemma',
        status: 'Релиз Январь 2026. Specialized Open-Source Model.',
        category: 'secondary',
        badges: ['Specialized NMT/LLM', 'Edge AI', 'Offline'],
        contextWindow: 'Локальное исполнение.',
        shortDescription: 'Легковесная гибридная ИИ-модель от Google (архитектура Gemma 3), обученная сверхточно переводить текст и картинки оффлайн.',
        fullDescription: 'Модель тренировалась в 2 этапа (SFT + RLHF/RLAIF) на переводческих корпусах. Версия 12B работает локально на ноутбуках, но по качеству (WMT24++) превосходит массивные универсальные 27B-модели. Поддерживает перевод текста прямо с картинок без потери контекста.',
        roleInThesis: 'Проверка фундаментальной гипотезы: способна ли легковесная оффлайн гибридная NMT/LLM превзойти в точности огромные облачные LLM-генералисты?',
        futurePlansNote: 'Тестирование модели TranslateGemma 27B (наивысшего качества) также планируется провести в рамках будущих практических этапов данного дипломного исследования.',
        color: 'teal'
    },
    'saiga-russian-oss': {
        id: 'saiga-russian-oss',
        name: 'Saiga (Илья Гусев) & Qwen3 RU',
        shortName: 'Russian OSS',
        status: 'Российское Open-Source сообщество (2025-2026).',
        category: 'russian_opensource',
        badges: ['Open Source', 'Uncensored', 'Russian Discourse'],
        contextWindow: 'Зависит от базовой модели (Gemma 3, Qwen3, LLaMA).',
        shortDescription: 'Неофициальные российские open-source модели (от Ильи Гусева), тренированные на рунете. Понимают сленг и мемы лучше корпоративных LLM.',
        fullDescription: 'Серии моделей (saiga_gemma3_12b, Qwen3-tuning и др.), дообученные на гигантских корпусах рунета. Работают локально (GGUF/llama.cpp), полностью лишены корпоративной "вылизанности" и цензуры. Они идеально понимают русский мемный код, маты и живой язык сети.',
        roleInThesis: 'Служат примером того, что независимый локальный fine-tuning открытых весов может привести ИИ-модель к конкурентоспособности с закрытыми корпоративными решениями в рамках узких культурно-языковых задач РФ.',
        color: 'slate'
    }
};

export const getLlmProfileList = () => Object.values(llmProfiles);
export const getPrimaryModels = () => getLlmProfileList().filter(m => m.category === 'primary');
export const getSecondaryModels = () => getLlmProfileList().filter(m => m.category !== 'primary');

// Вспомогательная функция для безопасного поиска модели по различным вариантам нейминга в коде
export const findLlmProfileByName = (searchName: string): LlmProfile | undefined => {
    const normSearch = searchName.toLowerCase().replace(/[^a-z0-9]/g, '');
    return getLlmProfileList().find(profile => {
        const normName = profile.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normShortName = profile.shortName.toLowerCase().replace(/[^a-z0-9]/g, '');
        return normName.includes(normSearch) || normShortName.includes(normSearch) || normSearch.includes(normShortName);
    });
};
