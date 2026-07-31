---
title: Yorulma Analizine Giriş
tags: [yorulma, malzeme, dayanım]
summary: Yorulma davranışındaki temel kavramlar ve tasarım düşüncesi.
subject: Makine elemanları
lang: tr
translationKey: fatigue-principles
category: Malzeme bilimi
source: "Mühendislik ders notları"
date: 2026-07-23
---

Yorulma, tekrar eden yüklemeler altında malzemede oluşan hasarın sürekliliği ile ilgilidir[^1]. Tasarımda güvenlik katsayısı ve gerilme çevrimi kavramı ön plana çıkar.

```python
import math

def safety_factor(stress, endurance_limit):
    return endurance_limit / stress
```

## Analiz akışı

```mermaid
flowchart TD
    A[Yük geçmişi] --> B[Gerilme çevrimi belirleme]
    B --> C[S-N eğrisi / malzeme verisi]
    C --> D[Güvenlik katsayısı hesabı]
    D --> E{Katsayı yeterli mi?}
    E -->|Evet| F[Tasarım onayı]
    E -->|Hayır| G[Geometri/malzeme revizyonu]
```

## Kaynakça

1. TODO: kullanılan ders notu / referans kaynak bilgisi eklenecek.

[^1]: Shigley's Mechanical Engineering Design — yorulma hasarı ve S-N eğrisi yaklaşımı.
