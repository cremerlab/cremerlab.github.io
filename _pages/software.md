---
title: Software
subtitle: >
    We believe in the idea of open science and are commited to support the open
    source movement. Projects are available via our <a
    href="https://github.com/cremerlab" style="color:#FFF"><i>GitHub organization</i></a>.  A selection of
    our work is listed here.
featured_image: /images/code.png
---

{% for code in site.data.software %}

<hr/>
<h3>{{code.title}}</h3>
{% if code.link %}
<a class="button " href="{{code.link}}">GitHub Repository</a>
{% endif %}
<i>{{code.language}} code written by {{code.author}}, {{code.year}}</i><br/>
{{code.description}}<br/>
{%endfor%}
