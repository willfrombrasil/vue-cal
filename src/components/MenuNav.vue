<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link" to="text_transform">Text Transform</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link" to="text_analyzer">Text Analyzer</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link" to="text_afix">Text Afix</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link" to="lorem_generator">Lorem Generator</RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link" to="password_generator">Password Generator</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>