---
title: Introduction to Fatigue Analysis
tags: [fatigue, material, strength]
summary: Fundamental concepts in fatigue behavior and design considerations.
subject: Machine elements
category: Materials science
source: "Engineering course notes"
date: 2026-07-23
lang: en
translationKey: fatigue-principles
---

Fatigue concerns the progressive damage that accumulates in a material under repeated loading[^1]. In design, the safety factor and the stress cycle concept take center stage.

```python
import math

def safety_factor(stress, endurance_limit):
    return endurance_limit / stress
```

## Analysis workflow

```mermaid
flowchart TD
    A[Load history] --> B[Determine stress cycle]
    B --> C[S-N curve / material data]
    C --> D[Safety factor calculation]
    D --> E{Is the factor sufficient?}
    E -->|Yes| F[Design approved]
    E -->|No| G[Geometry/material revision]
```

## References

1. TODO: course note / reference source information to be added.

[^1]: Shigley's Mechanical Engineering Design — fatigue damage and the S-N curve approach.
