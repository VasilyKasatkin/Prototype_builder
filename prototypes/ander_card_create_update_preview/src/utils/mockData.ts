import { faker } from '@faker-js/faker'

export function generateMockData() {
  return {
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    },
    items: Array.from({ length: 5 }, () => ({
      id: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
    })),
  }
}

export function generateMockUsers(count: number = 10) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(['admin', 'user', 'guest']),
  }))
}

export function generateMockCards(count: number = 5) {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    image: faker.image.urlLoremFlickr({ category: 'business' }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    status: faker.helpers.arrayElement(['draft', 'published', 'archived']),
    author: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  }))
}
