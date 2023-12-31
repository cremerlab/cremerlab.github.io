---
title: Alumni
subtitle: >
    Our previous group members
featured_image: /images/blackboard.jpg
---

{% for alumni in site.data.alumni %}
<a href="{{alumni.link}}"><b>{{alumni.name}}</b></a><br/>
{{alumni.title}} {{alumni.dates}}<br/>
{{alumni.location}} <br/>
{% endfor %}

