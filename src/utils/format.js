export const dateFormatter = (date) => {
    return new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium'
      }).format(new Date(date))
}