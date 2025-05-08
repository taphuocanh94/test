'use server'

export default async function test() {
    console.log('Before Testtttttt')
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log('Testtttttt')
    return 1;
}