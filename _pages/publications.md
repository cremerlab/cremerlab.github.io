---
title: Publications
subtitle: >
    A list of all of our publications, both pre-prints and those which have gone
    under peer review, are listed below. Please reach out to us if you don't have
    access to any of our work!
featured_image: /images/blackboard.jpg
---

<sup>*</sup> indicates equal contribution

{% for year in site.data.publications %}
<hr/>
<h3>{{year[0]}}</h3>

{% for paper in year[1] %}
<a href="https://doi.org/{{paper.doi}}"><b>{{paper.title}}</b></a><br/>
{{paper.authors}}<br/>
<i>{{paper.journal}}</i> {{paper.volume}}<b>{{paper.issue}}</b> ({{year[0]}}) doi: `{{paper.doi}}`
{% if paper.github != "" %}
<a href={{paper.github}}>GitHub Repository</a><br/>
{% endif %}

{% endfor %}
{% endfor %}

