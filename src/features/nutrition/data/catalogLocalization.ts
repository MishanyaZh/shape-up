import { FoodCategory } from '@/shared/domain/models';
import { NutritionFoodOption } from '@/features/nutrition/domain/types';
import {
  nutritionFoodCategories,
  nutritionFoodOptions,
} from '@/features/nutrition/data/catalog';
import { AppLocale } from '@/providers/UiPreferencesProvider';

type SupportedLocale = AppLocale;

type LocalizedNames = Record<string, string>;

const categoryNamesByLocale: Record<
  Exclude<SupportedLocale, 'en'>,
  LocalizedNames
> = {
  uk: {
    protein: 'Білки',
    carbs: 'Вуглеводи',
    fats: 'Жири',
    extras: 'Кастом',
  },
  pl: {
    protein: 'Bialko',
    carbs: 'Weglowodany',
    fats: 'Tluszcze',
    extras: 'Custom',
  },
};

const foodNamesByLocale: Record<
  Exclude<SupportedLocale, 'en'>,
  LocalizedNames
> = {
  uk: {
    'chicken-breast': 'Куряче Філе',
    'turkey-fillet': 'Філе Індички',
    'veal-lean': 'Пісна Телятина',
    'beef-tenderloin': 'Яловича Вирізка',
    'pork-tenderloin': 'Свиняча Вирізка',
    'rabbit-meat': 'Кролятина',
    'beef-tongue': 'Яловичий Язик',
    'chicken-thigh': 'Куряче Стегно',
    'chicken-drumstick': 'Куряча Гомілка',
    'liver-beef': 'Яловича Печінка',
    'eggs-omelette': 'Омлет з Яєць',
    'boiled-eggs': 'Варені Яйця',
    'cottage-cheese-9': 'Творог 9%',
    'greek-yogurt': 'Грецький Йогурт',
    'kefir-2-5': 'Кефір 2.5%',
    'yogurt-plain-1-6': 'Натуральний Йогурт 1.6%',
    'milk-2-5': 'Молоко 2.5%',
    'soft-cheese': 'М’який Сир',
    'hard-cheese': 'Твердий Сир',
    'processed-cheese': 'Плавлений Сир',
    'cod-fillet': 'Філе Тріски',
    'salmon-fillet': 'Філе Лосося',
    'mackerel-fillet': 'Філе Скумбрії',
    'seafood-mix': 'Морський Мікс',
    shrimp: 'Креветки',
    'beans-boiled': 'Варена Квасоля',
    'lentils-boiled': 'Варена Сочевиця',
    'chickpeas-boiled': 'Варений Нут',
    'rice-cooked': 'Варений Рис',
    'brown-rice': 'Бурий Рис',
    oats: 'Вівсянка',
    'corn-flakes-unsweetened': 'Несолодкі Пластівці',
    'bulgur-cooked': 'Булгур',
    'buckwheat-cooked': 'Гречка',
    'wholegrain-cereal': 'Цільнозернова Крупа',
    'quinoa-cooked': 'Кіноа',
    'barley-cooked': 'Перловка',
    'couscous-cooked': 'Кускус',
    'potato-baked': 'Запечена Картопля',
    'sweet-corn': 'Свіжа Кукурудза',
    'wholegrain-crispbread': 'Цільнозернові Хлібці',
    'wholegrain-bread': 'Цільнозерновий Хліб',
    'wholewheat-pasta': 'Цільнозернові Макарони',
    'wholegrain-lavash': 'Цільнозерновий Лаваш',
    banana: 'Банан',
    'olive-oil': 'Оливкова Олія',
    avocado: 'Авокадо',
    almonds: 'Мигдаль',
    walnuts: 'Волоські Горіхи',
    'sunflower-seeds': 'Насіння Соняшнику',
    'pumpkin-seeds': 'Гарбузове Насіння',
    olives: 'Оливки',
    butter: 'Масло',
    lard: 'Сало',
    'sour-cream-15': 'Сметана 15%',
    mustard: 'Гірчиця',
    mayonnaise: 'Майонез',
    ketchup: 'Кетчуп',
    'salad-mix': 'Салат Мікс',
    sauerkraut: 'Квашена Капуста',
    'mixed-greens': 'Мікс Зелені',
    mushrooms: 'Гриби',
    broccoli: 'Броколі',
    'cucumber-tomato-salad': 'Салат Огірок-Помідор',
    'mixed-vegetables': 'Овочевий Мікс',
    berries: 'Ягоди',
    'seasonal-fruits': 'Сезонні Фрукти',
    apple: 'Яблуко',
    orange: 'Апельсин',
    'nuts-and-seeds-mix': 'Мікс Горіхів і Насіння',
    'treat-choice': 'Кастомна Солодкість (50 г)',
    'snack-choice': 'Кастомний Продукт (50 г)',
  },
  pl: {
    'chicken-breast': 'Piers z Kurczaka',
    'turkey-fillet': 'Filet z Indyka',
    'veal-lean': 'Chuda Cielecina',
    'beef-tenderloin': 'Poledwica Wolowa',
    'pork-tenderloin': 'Poledwiczka Wieprzowa',
    'rabbit-meat': 'Mieso Krolicze',
    'beef-tongue': 'Jezyk Wolowy',
    'chicken-thigh': 'Udko z Kurczaka',
    'chicken-drumstick': 'Podudzie z Kurczaka',
    'liver-beef': 'Watrobka Wolowa',
    'eggs-omelette': 'Omlet Jajeczny',
    'boiled-eggs': 'Jajka Gotowane',
    'cottage-cheese-9': 'Twarog 9%',
    'greek-yogurt': 'Jogurt Grecki',
    'kefir-2-5': 'Kefir 2.5%',
    'yogurt-plain-1-6': 'Jogurt Naturalny 1.6%',
    'milk-2-5': 'Mleko 2.5%',
    'soft-cheese': 'Ser Miekki',
    'hard-cheese': 'Ser Twardy',
    'processed-cheese': 'Ser Topiony',
    'cod-fillet': 'Filet z Dorsza',
    'salmon-fillet': 'Filet z Lososia',
    'mackerel-fillet': 'Filet z Makreli',
    'seafood-mix': 'Mix Owocow Morza',
    shrimp: 'Krewetki',
    'beans-boiled': 'Gotowana Fasola',
    'lentils-boiled': 'Gotowana Soczewica',
    'chickpeas-boiled': 'Gotowana Ciecierzyca',
    'rice-cooked': 'Ryz Gotowany',
    'brown-rice': 'Ryz Brazowy',
    oats: 'Platki Owsiane',
    'corn-flakes-unsweetened': 'Nieslodzone Platki',
    'bulgur-cooked': 'Kasza Bulgur',
    'buckwheat-cooked': 'Kasza Gryczana',
    'wholegrain-cereal': 'Pelnoziarniste Platki',
    'quinoa-cooked': 'Komosa Ryzowa',
    'barley-cooked': 'Kasza Jeczmienna',
    'couscous-cooked': 'Kuskus',
    'potato-baked': 'Ziemniak Pieczony',
    'sweet-corn': 'Kukurydza Swieza',
    'wholegrain-crispbread': 'Pieczywo Chrupkie Pelnoziarniste',
    'wholegrain-bread': 'Chleb Pelnoziarnisty',
    'wholewheat-pasta': 'Makaron Pelnoziarnisty',
    'wholegrain-lavash': 'Lawasz Pelnoziarnisty',
    banana: 'Banan',
    'olive-oil': 'Oliwa z Oliwek',
    avocado: 'Awokado',
    almonds: 'Migdały',
    walnuts: 'Orzechy Wloskie',
    'sunflower-seeds': 'Pestki Slonecznika',
    'pumpkin-seeds': 'Pestki Dyni',
    olives: 'Oliwki',
    butter: 'Maslo',
    lard: 'Smalec',
    'sour-cream-15': 'Smietana 15%',
    mustard: 'Musztarda',
    mayonnaise: 'Majonez',
    ketchup: 'Ketchup',
    'salad-mix': 'Mix Salat',
    sauerkraut: 'Kapusta Kiszona',
    'mixed-greens': 'Mix Zielonych Warzyw',
    mushrooms: 'Grzyby',
    broccoli: 'Brokuly',
    'cucumber-tomato-salad': 'Salatka Ogorek-Pomidor',
    'mixed-vegetables': 'Mix Warzyw',
    berries: 'Owoce Jagodowe',
    'seasonal-fruits': 'Owoce Sezonowe',
    apple: 'Jablko',
    orange: 'Pomarancza',
    'nuts-and-seeds-mix': 'Mix Orzechow i Nasion',
    'treat-choice': 'Custom Slodycz (50 g)',
    'snack-choice': 'Custom Produkt (50 g)',
  },
};

function getLocalizedName(
  locale: SupportedLocale,
  id: string,
  fallbackName: string,
  source: Record<Exclude<SupportedLocale, 'en'>, LocalizedNames>,
): string {
  if (locale === 'en') {
    return fallbackName;
  }

  return source[locale][id] ?? fallbackName;
}

export function getLocalizedNutritionFoodOptions(
  locale: SupportedLocale,
): NutritionFoodOption[] {
  return nutritionFoodOptions.map((food) => ({
    ...food,
    name: getLocalizedName(locale, food.id, food.name, foodNamesByLocale),
  }));
}

export function getLocalizedNutritionFoodCategories(
  locale: SupportedLocale,
): FoodCategory[] {
  return nutritionFoodCategories.map((category) => ({
    ...category,
    name: getLocalizedName(
      locale,
      category.id,
      category.name,
      categoryNamesByLocale,
    ),
  }));
}

export function localizeFoodLabelById(
  locale: SupportedLocale,
  foodId: string,
  fallbackName: string,
): string {
  return getLocalizedName(locale, foodId, fallbackName, foodNamesByLocale);
}
