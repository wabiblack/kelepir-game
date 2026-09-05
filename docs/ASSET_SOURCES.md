# KELEPİR Asset Kaynakları

Bu dosya projeye giren üçüncü taraf asset paketlerinin kaynağını, lisansını ve KELEPİR içindeki kullanım alanını takip eder.

## Global görsel üretim kuralı

KELEPİR'de ekranda görünen hiçbir yeni görsel varsayılan olarak sıfırdan çizilmez. Bu kural yalnızca satılan ürünler için değil, **ana menü, giriş sahnesi, şehir, sokak, oda, dükkân, pazar, depo, atölye, bina, araç, NPC, mobilya, aksesuar, tabela, duvar dekoru, küçük prop, UI ve ikonlar** için de geçerlidir.

Öncelik sırası:

1. Lisansı doğrulanmış ve ana sanat diliyle uyumlu hazır 2D asset.
2. Aynı aileden hazır 3D modelin sabit kamera, ışık ve render şablonuyla 2D oyun görseline çevrilmesi.
3. Aynı pakette bulunmuyorsa stil, perspektif, gölge ve detay seviyesi uyumlu ikinci bir lisansı temiz paket.
4. Uygun asset bulunamazsa arama alanı genişletilir. Sıfırdan çizime dönülmez.

Bir asset oyuna alınmadan önce kaynak, lisans, dönem uyumu ve görsel eşleşme doğrulanır. Sadece dosya adına bakıp bir ürün veya mekân adı uydurulmaz.

## Ana dünya ailesi — Kenney Retro Urban Kit

- Resmi kaynak: https://kenney.nl/assets/retro-urban-kit
- Lisans: Creative Commons CC0 1.0
- Rol: KELEPİR'in şehir ve dış mekân temel görsel ailesi
- Kullanım: ana menü arka planı, giriş sahnesi, sokaklar, pazar çevresi, bina parçaları, tenteler, banklar, paletler, çöp konteynerleri, sokak lambaları, yollar, ağaçlar ve dönemle uyumlu ticari araçlar
- Sabit açık kaynak ayna: https://github.com/GeorgeQLe/assets-2d-city
- Sabit commit: `5cbe208ef7c630f3f54047c7ce75b9b8834a95ad`

Projede `data/worldAssets.ts` bu sürümü sabitler. Görseller mümkün olduğunca doğrudan bu sabit commit altındaki hazır preview/render dosyalarından kullanılır. Böylece ana menüden dünya haritasına kadar aynı perspektif ve malzeme dili korunur.

Aynı açık kütüphane ayrıca Kenney RPG Urban Pack ve Tiny Town paketlerini içerir. Bunlar yalnızca Retro Urban ile stil uyumu bozulmadığında tamamlayıcı olarak kullanılacaktır.

## İç mekân ana aday — PSX Retro Props Pack

- Kaynak: https://lewie.itch.io/psx-retro-props-pack
- Lisans: CC0
- Rol: oda, ev, küçük dükkân ve erken oyun iç mekânları
- İçerik örnekleri: yatak, masa, sandalye, lamba, raf, çekmece, kitaplar, buzdolabı, gazete standı, hoparlör, el aletleri, matkap, kalem, makas ve diğer günlük prop'lar
- Kullanım kuralı: ilk oda dahil mevcut geçici özel çizim mekânlar zamanla bu tür doğrulanmış hazır iç mekân assetleriyle değiştirilecek.

## Kenney — Generic Items

- Resmi kaynak: https://kenney.nl/assets/generic-items
- Lisans: Creative Commons CC0 1.0
- Paket türü: 2D item / tools / household / tech
- KELEPİR kullanımı: erken oyun envanter ikonları, küçük eşya adayları ve geliştirme prototipleri
- Repo içindeki tarayıcı: `/art-lab`

Geliştirme ortamında görseller, `eturner58/game-assets` adlı açık Kenney aynasından sabit bir commit SHA üzerinden çağrılır. Böylece paketin içeriği sonradan değişse bile KELEPİR'in kullandığı sürüm sabit kalır.

## Kenney — Character Pack

- Lisans: Creative Commons CC0 1.0
- Kullanım: müşteri, satıcı ve mahalle NPC'leri
- Modüler yüz, saç, ten ve kıyafet parçaları kullanılır.
- Not: küçük avatar kullanımında uygundur. Büyük ana müşteri sunumlarında daha profesyonel ve aynı sanat dilinde hazır bir karakter/portre paketi bulunursa öncelik ona verilecektir.

## Kenney — UI Pack 2.0

- Lisans: Creative Commons CC0 1.0
- Kullanım: buton, ok, checkbox, slider ve durum ikonları
- Ana palet: Green + Grey, riskli aksiyonlarda Red
- Kural: ekran CSS'i bu hazır UI görsellerinin yerine yeniden düz prototip buton çizmemelidir.

## 3dmodelscc0 Electronics & Gadgets

- Kaynak: https://3dmodelscc0.itch.io/free-cc0-electronics-gadgets-pack
- Lisans: CC0
- İçerik: console, digital camera, flashlight, microphone, radio, router, security camera, USB stick, VR goggles, radiophone
- Planlanan kullanım: model-spesifik veya büyük ürün kartları için sabit kamera 2D render kaynağı

## Retro Office Pack

- Kaynak: https://retroblockstudio.itch.io/retro-office-pack
- Lisans: CC0
- İçerik: retro PC, vintage TV, old radio, 90'lar tipi telefon, desk, chair, flashlight ve dekor objeleri
- Planlanan kullanım: 1990'lar / 2000'lerin başı elektronik, oda, işyeri ve dükkân prop'ları

## OpenGameArt Retro Items

- Kaynak: https://opengameart.org/content/retro-items
- Lisans: CC0
- İçerik: kamera, kaset/kasetçalar, telefon, radyo, VCR/VHS, kulaklık, saat ve benzeri retro item'lar
- Not: pixel art olduğu için ana görsel diline uymadığı ekranlarda kullanılmaz; yalnızca stil uyumu sağlanırsa değerlendirilir.

## CC0Tree

- Kaynak: https://github.com/SkywolfGameStudios/CC0Tree
- Lisans: CC0
- İçerik: büyüyen düşük poligon 3D prop ve çevre asset kütüphanesi
- Planlanan kullanım: ileride dükkân, depo, sokak, tamir alanı ve büyük prop havuzu

## Dönem ve konsept kontrolü

Bir asset lisans ve stil olarak uygun olsa bile sahnenin yılına uymuyorsa kullanılmaz. 2002 başlangıcında görünen telefon, araç, bilgisayar, tabela, mobilya ve mağaza aksesuarlarının dönem hissi ayrıca kontrol edilir. Oyunda yıllar ilerledikçe asset havuzu da dönemlere göre açılır.

## Sanat politikası

Hazır asset bulunamadığında sıfırdan çizime dönülmez. Arama alanı genişletilir veya uygun bir CC0 3D model bulunup KELEPİR'in sabit render şablonuyla 2D'ye çevrilir. Model-spesifik telefon, konsol, otomobil, traktör ve koleksiyonluk ürünlerde de aynı yaklaşım geçerlidir.
