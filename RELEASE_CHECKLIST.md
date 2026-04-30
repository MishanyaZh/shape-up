# ShapeUp MVP Release Checklist / Чеклист релізу ShapeUp MVP

Last updated / Оновлено: 2026-05-01

## Scope / Обсяг

MVP scope for this release / Обсяг MVP для цього релізу:

- BMR/TDEE calculator / Калькулятор BMR/TDEE
- Nutrition plan generator / Генератор плану харчування
- Daily food tracking / Щоденний трекінг харчування
- Compliance indicator (calories + macros + combined) / Індикатор дотримання (калорії + макроси + загальний)

## Pre-Release Gate / Передрелізний контроль

- [x] Feature-first structure in place (`calculator`, `nutrition`, `tracking`) / Структура за фічами впроваджена (`calculator`, `nutrition`, `tracking`)
- [x] Shared app state with local persistence enabled / Спільний стан застосунку з локальним збереженням увімкнено
- [x] Unit tests added for core domain logic / Додані юніт-тести для ключової доменної логіки
- [x] Lint/test scripts configured in `package.json` / Налаштовані скрипти lint/test у `package.json`
- [x] Main user flows wired from home page / Основні користувацькі сценарії зв'язані з головної сторінки

## Manual Smoke Checklist (No CLI Required) / Ручний smoke-чеклист (без CLI)

Run through these checks in the browser / Пройди ці перевірки в браузері:

1. Calculator flow (`/calculators`) / Флоу калькулятора (`/calculators`)

- [x] Enter valid inputs and calculate results / Введи валідні дані та виконай розрахунок
- [x] Verify BMR, TDEE, calorie target, and macros are shown / Перевір відображення BMR, TDEE, цільових калорій і макросів
- [x] Reload page and verify calculated target persists / Онови сторінку та перевір, що розрахована ціль збереглась
- [ ] Verify CTA after calculation leads to Nutrition Plan Generator / Перевір, що CTA після розрахунку веде в Nutrition Plan Generator

2. Nutrition plan flow (`/nutrition`) / Флоу плану харчування (`/nutrition`)

- [x] Open page and generate a plan from current targets / Відкрий сторінку та згенеруй план з поточних цілей
- [x] Verify meal blocks include food options by category / Перевір, що блоки прийомів їжі містять опції по категоріях
- [x] Reload page and verify last generated plan persists / Онови сторінку та перевір збереження останнього згенерованого плану
- [ ] Verify Open Daily Progress action is visible and routes correctly / Перевір, що кнопка Open Daily Progress видима і веде коректно

3. Tracking flow (`/progress`) / Флоу трекінгу (`/progress`)

- [x] Verify target fields are prefilled from calculator values / Перевір, що target-поля попередньо заповнені з калькулятора
- [x] Add entries for different meal types/categories / Додай записи для різних типів прийомів їжі та категорій
- [x] Verify Add Entry is disabled until food + valid quantity are selected / Перевір, що Add Entry неактивна, доки не обрано food і валідну кількість
- [x] Remove an entry and verify totals update immediately / Видали запис і перевір миттєве оновлення підсумків
- [x] Verify compliance bars and status labels update after each change / Перевір, що індикатори та статус оновлюються після кожної зміни
- [ ] Verify Daily Structure block is visible and linked to generated nutrition plan / Перевір, що блок Daily Structure відображається і пов'язаний зі згенерованим планом

4. Home navigation (`/`) / Навігація з головної (`/`)

- [ ] Verify CTA links route correctly to calculators, nutrition, and progress / Перевір коректність CTA-переходів на calculators, nutrition і progress

## UX/Content Polish / UX і контент polishing

- [ ] Confirm text is consistent (English wording) across all routes / Підтверди узгодженість текстів (англомовний wording) на всіх маршрутах
- [ ] Confirm no mixed-language labels (EN + RU/UA) in one user flow / Підтверди, що в одному user flow немає змішування мов (EN + RU/UA)
- [ ] Confirm empty states are visible and understandable / Підтверди, що empty states помітні та зрозумілі
- [ ] Confirm spacing/readability on mobile viewport / Підтверди відступи та читабельність на мобільному viewport

## Known Risks / Follow-ups / Відомі ризики та подальші кроки

- Dependency vulnerabilities were previously reported by npm audit. They do not block MVP runtime, but should be triaged before production deployment. / Раніше `npm audit` показував вразливості залежностей. Для MVP вони не блокують runtime, але їх треба пріоритезувати перед продакшн-деплоєм.
- `docs/project-context.md` mentions Tailwind, while implementation uses MUI. Keep MUI as source of truth in code unless product direction changes. / У `docs/project-context.md` згадується Tailwind, але реалізація на MUI. Вважай MUI джерелом істини в коді, доки не зміниться продуктовий напрям.

## Release Decision / Рішення про реліз

Ship when all unchecked smoke items are completed and no blocker regression is found. / Випускати реліз, коли всі пункти smoke-чеку закриті і немає blocker-регресій.
