const container = document.querySelector('.jobs-listings')
fetch('./data.json')
.then((response) => {
  return response.json()   
})
.then((jobs) => {
  jobs.forEach((jobs) => {
    const article = document.createElement('article')
    article.className="job-listing"
    article.dataset.modalidad = jobs.data.modalidad
    article.dataset.nivel = jobs.data.nivel
    article.dataset.technology = jobs.data.technology

    article.innerHTML = `<div>
    <h3>${jobs.titulo}</h3>
    <small>${jobs.empresa} | ${jobs.ubicacion} </small>
    <p>${jobs.descripcion}</p>
    </div>
    <button class="button-apply">Aplicar</button>
    `
  container.appendChild(article)
  })
})