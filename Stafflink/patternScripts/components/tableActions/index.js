export const employeeTableActions = (filter_all_callback, filter_ordenate_callback) => {
    const filter_all = document.querySelector('.filter.all')
    const filter_ordenate = document.querySelector('.filter.ordenate')

    filter_all.addEventListener('click', (event) => {
        filter_all_callback(event.target)
    })

    filter_ordenate.addEventListener('change', (event) => {
        filter_ordenate_callback(event.target)
    })
}