const formDate = (date: string | undefined) => {
  if (date) {
    const date1 = date.split('T')[0].split('-')
    const date2 = `${date1[1]}-${date1[2]}-${date1[0]}`

    const newDate = new Date(date2)
    return newDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}

export default formDate
