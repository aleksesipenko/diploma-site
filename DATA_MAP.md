# DATA_MAP — Карта данных

## Источники данных

### Первичные источники
- `11_summary_report.md` — агрегированные результаты
- `01_report.md` — `10_report.md` — детальные отчёты по текстам
- `01_user_prompt.md` — `10_user_prompt.md` — исходные тексты и переводы

### Расположение
```
/Users/alexesip/Desktop/диплом/АДМИН/judge_opus/
```

## Структура JSON

### diploma-data.json

#### `summary`
| Поле | Тип | Описание | Источник |
|------|-----|---------|----------|
| `criteriaAverages` | Object | Средние баллы по критериям | 11_summary_report.md, Таблица 1.1 |
| `textScores` | Array | Баллы по каждому тексту | 11_summary_report.md, Таблица 1.2 |
| `genreRankings` | Array | Рейтинг по жанрам | 11_summary_report.md, Раздел 2 |
| `overallWinner` | Object | Информация о победителе | 11_summary_report.md, Раздел 3 |
| `modelProfiles` | Object | Профили моделей | 11_summary_report.md, Раздел 3 |
| `limitations` | Array | Ограничения исследования | 11_summary_report.md, Раздел 4 |
| `conclusions` | Array | Выводы | 11_summary_report.md, Раздел 5 |

#### `reports[]`
| Поле | Тип | Описание | Источник |
|------|-----|---------|----------|
| `id` | number | ID текста (1-10) | — |
| `title` | string | Название | 01-10_report.md |
| `genre` | string | Жанр (EN) | 01-10_report.md |
| `genreRu` | string | Жанр (RU) | — |
| `genreDescription` | string | Описание жанра | 01-10_report.md, "Жанр и функция" |
| `original` | string | Оригинал (EN) | 01-10_user_prompt.md |
| `translations` | Object | Переводы моделей | 01-10_user_prompt.md |
| `scores` | Object | Баллы по критериям | 01-10_report.md |
| `winner` | string | Победитель | 01-10_report.md |
| `observations` | Object | Наблюдения по моделям | 01-10_report.md, "Ключевые наблюдения" |

## Критерии оценки

| Критерий | Вес | Описание |
|----------|-----|----------|
| A. Адекватность | 35% | Точность передачи смысла |
| B. Жанр и стиль | 25% | Соответствие жанру |
| C. Естественность | 20% | Естественность русского языка |
| D. Терминология | 10% | Корректность терминов |
| E. Прагматика | 10% | Воздействие на читателя |

## Формула взвешенного балла

```
weighted = 0.35*A + 0.25*B + 0.20*C + 0.10*D + 0.10*E
```

## Обновление данных

1. Изменить `src/data/diploma-data.json`
2. Пересобрать: `npm run build`
3. Проверить: `npm run preview`
