export const firstLetterToUpperCase = (name: string) => {
    name = name.toLowerCase()
    const firstLetter = name[0]
    const upperCaseFirstLetter = firstLetter.toUpperCase()
    return upperCaseFirstLetter + name.slice(1);
}

export const addLeadingZeros = (num: number) => {
    return (num.toString().padStart(3, '0'));
}