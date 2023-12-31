---
title: Alumni
subtitle: >
    Our previous group members
featured_image: /images/blackboard.jpg
---

{% for alumni in site.data.alumni %}
<b>{{alumni.name}}</b><br/>
{{alumni.title}} {{alumni.dates}}<br/>
<a href="{{alumni.link}}">{{alumni.location}}</a><br/>
{% endfor %}

