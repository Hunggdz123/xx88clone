window.tailwind = window.tailwind || {};

tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        ink: '#040812',
                        navy: '#071426',
                        card: '#0A182A',
                        neon: '#008CFF',
                        cyan: '#00C8FF',
                        gold: '#F5C451',
                        goldlight: '#FFE7A0',
                        muted: '#9AAEC2'
                    },
                    fontFamily: {
                        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
                        display: ['Montserrat', '"Be Vietnam Pro"', 'sans-serif']
                    }
                }
            }
        };

(function() {
        'use strict';

        var isManualBlocked = false;

        function showSecurityWarning(manual) {
            if (manual) isManualBlocked = true;
            var shield = document.getElementById('tfSecurityShield');
            if (shield) {
                shield.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }

        function hideSecurityWarning() {
            if (isManualBlocked) return;
            var shield = document.getElementById('tfSecurityShield');
            if (shield && shield.style.display === 'flex') {
                var threshold = 160;
                var widthDiff = window.outerWidth - window.innerWidth > threshold;
                var heightDiff = window.outerHeight - window.innerHeight > threshold;
                if (!widthDiff && !heightDiff) {
                    shield.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }
        }

        // 1. Chặn toàn bộ phím tắt mở DevTools, View Source, Lưu trang, In ấn
        window.addEventListener('keydown', function(e) {
            // F12
            if (e.keyCode === 123 || e.key === 'F12') {
                e.preventDefault();
                e.stopPropagation();
                showSecurityWarning(true);
                return false;
            }
            // Ctrl+Shift+I / J / C / K (Windows/Linux) hoặc Cmd+Option+I / J / C / K (Mac)
            if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (
                e.key === 'I' || e.key === 'i' ||
                e.key === 'J' || e.key === 'j' ||
                e.key === 'C' || e.key === 'c' ||
                e.key === 'K' || e.key === 'k'
            )) {
                e.preventDefault();
                e.stopPropagation();
                showSecurityWarning(true);
                return false;
            }
            // Ctrl+U / Cmd+U (View Source)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
                e.preventDefault();
                e.stopPropagation();
                showSecurityWarning(true);
                return false;
            }
            // Ctrl+S / Cmd+S (Save Page)
            if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            // Ctrl+P / Cmd+P (Print)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, true);

        // 2. Chặn chuột phải (Context Menu) chống Inspect / Kiểm tra phần tử
        window.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);

        // 3. Chặn kéo thả ảnh & sao chép nội dung ngoài ô nhập liệu
        window.addEventListener('copy', function(e) {
            if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
            e.preventDefault();
        }, true);
        window.addEventListener('cut', function(e) {
            if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
            e.preventDefault();
        }, true);
        window.addEventListener('dragstart', function(e) {
            e.preventDefault();
        }, true);

        // Check DevTools only when the window size changes; polling and debugger traps stall interaction.
        function checkDevTools() {
            var threshold = 160;
            var widthDiff = window.outerWidth - window.innerWidth > threshold;
            var heightDiff = window.outerHeight - window.innerHeight > threshold;
            if (widthDiff || heightDiff) {
                showSecurityWarning();
            } else {
                hideSecurityWarning();
            }
        }
        window.addEventListener('resize', checkDevTools);
    })();

document.body.classList.remove('no-js');

'use strict';

        // ================= Configuration =================
        const CONFIG = {
            autoSlideDelay: 4500,
            swipeThreshold: 45,
            particles: { desktop: 40, mobile: 14 }
        };
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ================= VIP data =================
        const TIERS = [
            { key: 'g1', group: 1, min: 1, max: 6, name: 'VIP 01–06', title: 'Khởi đầu tân thủ', desc: 'Thưởng tuần 3K–14K, Thưởng tháng 6K–38K, Thăng cấp 10K–118K.' },
            { key: 'g2', group: 2, min: 7, max: 12, name: 'VIP 07–12', title: 'Tích lũy bứt phá', desc: 'Thưởng tuần 16K–52K, Thưởng tháng 48K–198K, Thăng cấp 168K–518K.' },
            { key: 'g3', group: 3, min: 13, max: 18, name: 'VIP 13–18', title: 'Đẳng cấp hoàng kim', desc: 'Thưởng tuần 68K–168K, Thưởng tháng 258K–718K, Thăng cấp 628K–1,228K.' },
            { key: 'g4', group: 4, min: 19, max: 24, name: 'VIP 19–24', title: 'Vươn tầm cao thủ', desc: 'Thưởng tuần 188K–328K, Thưởng tháng 828K–1,588K, Thăng cấp 1,368K–2,228K.' },
            { key: 'g5', group: 5, min: 25, max: 30, name: 'VIP 25–30', title: 'Vương giả rực rỡ', desc: 'Thưởng tuần 368K–678K, Thưởng tháng 1,888K–3,388K, Thăng cấp 2,458K–4,588K.' },
            { key: 'g6', group: 6, min: 31, max: 36, name: 'VIP 31–36', title: 'Tím huyền bí quý tộc', desc: 'Thưởng tuần 778K–1,988K, Thưởng tháng 3,888K–9,888K, Thăng cấp 5,288K–13,888K.' },
            { key: 'g7', group: 7, min: 37, max: 42, name: 'VIP 37–42', title: 'Cánh đỏ thượng lưu', desc: 'Thưởng tuần 2,388K–5,688K, Thưởng tháng 11,888K–28,888K, Thăng cấp 15,888K–35,888K.' },
            { key: 'g8', group: 8, min: 43, max: 48, name: 'VIP 43–48', title: 'Cánh tím hồng tinh hoa', desc: 'Thưởng tuần 6,888K–15,588K, Thưởng tháng 33,888K–77,888K, Thăng cấp 42,888K–88,888K.' },
            { key: 'g9', group: 9, min: 49, max: 54, name: 'VIP 49–54', title: 'Hoàng kim vinh quang', desc: 'Thưởng tuần 17,888K–32,888K, Thưởng tháng 88,888K–158,888K, Thăng cấp 98,888K–158,888K.' },
            { key: 'g10', group: 10, min: 55, max: 60, name: 'VIP 55–60', title: 'Đỉnh cao tối thượng', desc: 'Thưởng tuần 36,888K–58,888K, Thưởng tháng 168,888K–288,888K, Thăng cấp 168,888K–388,888K.' }
        ];
        const vipLevels = Array.from({ length: 60 }, (_, index) => index + 1);
        const FEATURED_LEVELS = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];

        const getTier = (level) => TIERS.find((tier) => level >= tier.min && level <= tier.max) || TIERS[0];
        const getTierStars = (tier) => '✦'.repeat(TIERS.indexOf(tier) + 1);
        const crownIcon = (className) => `<svg class="${className}" aria-hidden="true" focusable="false"><use href="#i-crown"/></svg>`;

        const TIER_BADGES = {
            1: 'assets/vip-badges/vip-01.png',
            2: 'assets/vip-badges/vip-02.png',
            3: 'assets/vip-badges/vip-03.png',
            4: 'assets/vip-badges/vip-04.png',
            5: 'assets/vip-badges/vip-05.png',
            6: 'assets/vip-badges/vip-06.png',
            7: 'assets/vip-badges/vip-07.png',
            8: 'assets/vip-badges/vip-08.png',
            9: 'assets/vip-badges/vip-09.png',
            10: 'assets/vip-badges/vip-10.png'
        };

        // ================= Render functions =================
        // Badge artwork: one image per group of 6 levels (01-06 ... 55-60)
        const BADGE_SIZE = 6;
        const getBadgeGroup = (level) => Math.ceil(level / BADGE_SIZE);
        const getBadgeRange = (group) => {
            const pad = (n) => String(n).padStart(2, '0');
            return `${pad((group - 1) * BADGE_SIZE + 1)}–${pad(group * BADGE_SIZE)}`;
        };

        function renderVipLevels() {
            const grid = document.getElementById('vipGrid');
            grid.innerHTML = vipLevels.map((level) => {
                const group = getBadgeGroup(level);
                const range = getBadgeRange(group);
                return `
                    <article class="vip-card badge-g${group}" data-level="${level}" aria-label="VIP ${level}, nhóm VIP ${range}">
                        <div class="vip-card__inner">
                            <img class="vip-card__badge" src="${TIER_BADGES[group]}" alt="" width="68" height="68" loading="lazy" decoding="async">
                            <p class="vip-card__level">VIP ${level}</p>
                            <p class="vip-card__label">VIP ${range}</p>
                        </div>
                    </article>`;
            }).join('');
        }

        function memberCardHTML(level, tier) {
            const group = getBadgeGroup(level);
            const range = getBadgeRange(group);
            return `
                <div class="member-card badge-g${group}" role="img" aria-label="Thẻ thành viên VIP ${level}, nhóm VIP ${range}">
                    <div class="member-card__inner">
                        <div class="mc-top">
                            <img src="https://images.191829838.com/wsd-images-prod/xx88vndkf1/fe_setting/web_logo/wps_logo10_(2)_20260930200524.png" alt="XX88" class="mc-logo">
                            <span class="mc-chip"></span>
                        </div>
                        <img class="mc-badge" src="${TIER_BADGES[group]}" alt="Huy hiệu VIP ${range}" loading="lazy">
                        <div class="mc-level">VIP ${level}</div>
                        <div class="mc-label">NHÓM VIP ${range}</div>
                    </div>
                </div>`;
        }

        function renderFeaturedSlider() {
            const track = document.getElementById('sliderTrack');
            const dots = document.getElementById('sliderDots');
            const total = FEATURED_LEVELS.length;

            track.innerHTML = FEATURED_LEVELS.map((level, index) => {
                const tier = getTier(level);
                const group = getBadgeGroup(level);
                const range = getBadgeRange(group);
                return `
                    <div class="slide" role="group" aria-roledescription="slide" aria-label="${index + 1} / ${total}: VIP ${level}">
                        <div class="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-2 md:gap-12">
                            <div class="mx-auto w-[min(72vw,280px)] md:w-[300px]">${memberCardHTML(level, tier)}</div>
                            <div class="text-center md:text-left">
                                <p class="text-xs font-bold uppercase tracking-[0.3em] text-muted">Nhóm VIP ${range}</p>
                                <h3 class="mt-3 font-display text-3xl font-black sm:text-4xl"><span class="text-gold-grad">VIP ${level}</span></h3>
                                <p class="mt-2 text-lg font-semibold text-blue-grad">${tier.title}</p>
                                <p class="mt-3 text-muted leading-relaxed">${tier.desc}</p>
                                <a href="#levels" class="btn btn-ghost btn-sm mt-6" data-show-level="${level}">Xem VIP ${level} trong bảng cấp độ</a>
                            </div>
                        </div>
                    </div>`;
            }).join('');

            dots.innerHTML = FEATURED_LEVELS.map((level, index) =>
                `<button type="button" class="slider-dot" data-index="${index}" aria-label="Chuyển tới VIP ${level}"></button>`
            ).join('');
        }

        // ================= Loyalty rewards (fictional LP data) =================
        // Every value below is a fictional Loyalty Point (LP) amount generated by formula.
        // LP has no monetary value and exists only for this demo.
        const roundNice = (value) => {
            const step = value < 100 ? 5 : value < 1000 ? 10 : 50;
            return Math.max(step, Math.round(value / step) * step);
        };

        const MONTHLY_DATA = [
            [1500, 3], [5000, 5], [10000, 10], [20000, 16], [35000, 21], [50000, 30], [75000, 45], [100000, 60], [140000, 88], [190000, 118],
            [250000, 148], [325000, 198], [425000, 258], [550000, 328], [690000, 418], [840000, 508], [1000000, 600], [1190000, 718], [1390000, 828], [1600000, 958],
            [1840000, 1088], [2100000, 1288], [2390000, 1388], [2700000, 1588], [3040000, 1888], [3440000, 2088], [3865000, 2288], [4340000, 2588], [4940000, 2888], [5640000, 3388],
            [6440000, 3888], [7440000, 4388], [8940000, 5388], [10940000, 6588], [13440000, 8088], [16440000, 9888], [19940000, 11888], [23940000, 14388], [28440000, 16888], [33940000, 20888],
            [39940000, 23888], [48440000, 28888], [57940000, 33888], [69440000, 41888], [81440000, 48888], [94440000, 56888], [111440000, 66888], [129440000, 77888], [149440000, 88888], [170940000, 102888],
            [194440000, 116888], [219440000, 128888], [246440000, 138888], [274440000, 158888], [304440000, 168888], [336940000, 178888], [371440000, 188888], [409440000, 208888], [449440000, 238888], [494440000, 288888]
        ];

        const WEEKLY_DATA = [
            [300, 3], [1000, 5], [2000, 7], [4000, 9], [7000, 11], [10000, 13], [15000, 15], [20000, 17], [28000, 22], [38000, 30],
            [50000, 40], [65000, 52], [85000, 68], [110000, 88], [138000, 108], [168000, 128], [200000, 148], [238000, 168], [278000, 188], [320000, 208],
            [368000, 228], [420000, 248], [478000, 288], [540000, 328], [608000, 368], [688000, 408], [773000, 458], [868000, 528], [988000, 588], [1128000, 678],
            [1288000, 778], [1488000, 888], [1788000, 1088], [2188000, 1288], [2688000, 1588], [3288000, 1988], [3988000, 2388], [4788000, 2888], [5688000, 3388], [6788000, 4088],
            [7988000, 4888], [9688000, 5688], [11588000, 6888], [13888000, 8338], [16288000, 9888], [18888000, 11388], [22288000, 13388], [25888000, 15588], [29888000, 17888], [34188000, 20588],
            [38888000, 23388], [43888000, 25888], [49288000, 28888], [54888000, 32888], [60888000, 36888], [67388000, 40388], [74288000, 44888], [81888000, 48888], [89888000, 53888], [98888000, 58888]
        ];

        const LEVELUP_DATA = [
            [1, 30000, 10], [100, 100000, 28], [1000, 200000, 38], [3000, 400000, 68], [10000, 700000, 98], [20000, 1000000, 118], [30000, 1500000, 168], [40000, 2000000, 188], [60000, 2800000, 268], [70000, 3800000, 338],
            [80000, 5000000, 388], [100000, 6500000, 518], [120000, 8500000, 628], [150000, 11000000, 758], [200000, 13800000, 828], [250000, 16800000, 988], [300000, 20000000, 1088], [350000, 23800000, 1228], [400000, 27800000, 1368], [500000, 32000000, 1528],
            [600000, 36800000, 1688], [700000, 42000000, 1888], [800000, 47800000, 2088], [900000, 54000000, 2228], [1000000, 60800000, 2458], [1100000, 68800000, 2688], [1200000, 77300000, 2888], [1300000, 86800000, 3188], [1400000, 98800000, 3888], [1500000, 112800000, 4588],
            [1600000, 128800000, 5288], [1700000, 148800000, 6688], [1800000, 178800000, 8188], [1900000, 218800000, 9888], [2000000, 268800000, 11888], [2200000, 328800000, 13888], [2400000, 398800000, 15888], [2600000, 478800000, 18888], [2800000, 568800000, 21888], [3000000, 678800000, 25888],
            [3200000, 798800000, 28888], [3400000, 968800000, 35888], [3600000, 1158800000, 42888], [3800000, 1388800000, 48888], [4000000, 1628800000, 56888], [4200000, 1888800000, 66888], [4400000, 2228800000, 77888], [4600000, 2588800000, 88888], [4800000, 2988800000, 98888], [5000000, 3418800000, 108888],
            [5200000, 3888800000, 118888], [5400000, 4388800000, 128888], [5600000, 4928800000, 138888], [5800000, 5488800000, 158888], [6000000, 6088800000, 168888], [6500000, 6738800000, 178888], [7000000, 7428800000, 188888], [8000000, 8188800000, 228888], [9000000, 8988800000, 288888], [10000000, 9888800000, 388888]
        ];

        const BIRTHDAY_DATA = [
            18, 28, 38, 48, 58, 68, 88, 108, 158, 218,
            288, 388, 488, 588, 688, 788, 888, 1088, 1588, 2888,
            3888, 4888, 5888, 6888, 7888, 8888, 9888, 10888, 11888, 12888,
            13888, 14888, 15888, 16888, 17888, 18888, 19888, 20888, 21888, 22888,
            23888, 24888, 25888, 26888, 27888, 28888, 29888, 30888, 31888, 32888,
            33888, 34888, 35888, 38888, 43888, 48888, 53888, 58888, 63888, 68888
        ];

        const VIP_REWARDS = vipLevels.map((level) => {
            const n = level - 1;
            return {
                level,
                tier: getTier(level),
                expRequired: LEVELUP_DATA[n][1], // We'll set expRequired to match upgradeRequired so milestones kind of work if needed, though we don't strictly rely on it
                upgradeDeposit: LEVELUP_DATA[n][0],
                upgradeRequired: LEVELUP_DATA[n][1],
                upgrade: LEVELUP_DATA[n][2],
                weeklyRequired: WEEKLY_DATA[n][0],
                weekly: WEEKLY_DATA[n][1],
                monthlyRequired: MONTHLY_DATA[n][0],
                monthly: MONTHLY_DATA[n][1],
                birthday: BIRTHDAY_DATA[n]
            };
        });

        const MILESTONES = [
            [5000, 60], [20000, 150], [50000, 300], [100000, 550],
            [200000, 900], [400000, 1400], [700000, 2100], [1000000, 3000]
        ].map(([exp, points]) => ({ exp, points }));

        const REWARD_PROGRAMS = [
            { id: 'levelup', code: 'TCVIP', icon: '👑', title: 'THĂNG CẤP VIP THƯỞNG 388,888K', tagline: 'Phần thưởng thăng cấp trọn đời', field: 'upgrade', column: 'Tiền Thưởng',
              rules: [
                  'Múi giờ thống kê: GMT+8',
                  'Thời gian bắt đầu: 20/07/2025 - Thông báo sau',
                  'Chú ý: 1 điểm = 1,000 VND'
              ] },
            { id: 'weekly', code: 'VIPTUAN', icon: '📅', title: 'LƯƠNG VIP TUẦN - MỖI TUẦN 58,888K', tagline: 'Phần thưởng VIP hàng tuần', field: 'weekly', column: 'Thưởng Mỗi Tuần',
              rules: [
                  'Múi giờ thống kê: GMT+8',
                  'Thời gian bắt đầu: 20/07/2025 - Thông báo sau',
                  'Chú ý: 1 điểm = 1,000 VND'
              ] },
            { id: 'monthly', code: 'VIPTHANG', icon: '🗓️', title: 'LƯƠNG VIP THÁNG - MỖI THÁNG 288,888K', tagline: 'Đặc quyền cao cấp dành cho VIP', field: 'monthly', column: 'Thưởng Hàng Tháng',
              rules: [
                  'Múi giờ thống kê: GMT+8',
                  'Thời gian bắt đầu: 20/07/2025 - Thông báo sau',
                  'Chú ý: 1 điểm = 1,000 VND'
              ] },
            { id: 'birthday', code: 'VIP_SINHNHAT', icon: '🎂', title: 'ĐẶC QUYỀN VIP - SINH NHẬT VÀNG', tagline: 'Quà chúc mừng ngày sinh nhật', field: 'birthday', column: 'Tiền Thưởng',
              rules: [
                  'Múi giờ thống kê: GMT+8',
                  'Thời gian bắt đầu: 11/11/2025 - Thông báo sau',
                  'Chú ý: 1 điểm = 1,000 VND'
              ] },
            { id: 'milestone', code: 'MILESTONE', icon: '🏆', title: 'Sự kiện tích lũy mới', tagline: 'Quà mừng khi đạt mốc EXP mới', field: null, column: 'Quà mừng',
              rules: ['Quà mừng khi tổng EXP tích lũy đạt từng mốc.', 'Mỗi mốc chỉ nhận 1 lần.', 'Mở nhận trong 3 ngày sau khi đạt mốc.'] }
        ];

        const rewardState = { level: 30, tab: 'levelup' };
        const formatNumber = (value) => value.toLocaleString('vi-VN');
        const formatLP = (value) => `${formatNumber(value)} LP`;
        const getProgramMax = (program) => program.field
            ? Math.max(...VIP_REWARDS.map((reward) => reward[program.field]))
            : Math.max(...MILESTONES.map((milestone) => milestone.points));

        function renderRewardTabs() {
            document.getElementById('rwTabs').innerHTML = REWARD_PROGRAMS.map((program) => {
                const isActive = program.id === rewardState.tab;
                return `<button type="button" role="tab" class="rw-tab" id="rw-tab-${program.id}" data-tab="${program.id}"
                            aria-controls="rwPanel" aria-selected="${isActive}" tabindex="${isActive ? 0 : -1}">
                            <span aria-hidden="true">${program.icon}</span><span>${program.title}</span>
                        </button>`;
            }).join('');
        }

        function buildLevelRows(program, current) {
            return VIP_REWARDS.map((reward) => {
                const isCurrent = reward.level === current.level;
                return `
                    <tr class="${isCurrent ? 'is-current' : ''}">
                        <td><button type="button" class="row-pick" data-pick="${reward.level}">VIP ${reward.level}</button>${isCurrent ? '<span class="rw-badge">Đang xem</span>' : ''}</td>
                        <td><span class="rw-dot tier-${reward.tier.key}" aria-hidden="true"></span>${reward.tier.name}</td>
                        <td class="rw-points">${formatLP(reward[program.field])}</td>
                    </tr>`;
            }).join('');
        }

        function buildMilestoneRows(current) {
            return MILESTONES.map((milestone) => {
                const reached = current.expRequired >= milestone.exp;
                return `
                    <tr class="${reached ? 'is-reached' : ''}">
                        <td>${formatNumber(milestone.exp)}+ EXP</td>
                        <td class="rw-points">${formatLP(milestone.points)}</td>
                        <td>${reached ? '<span class="rw-badge ok">✓ Đã đạt</span>' : '<span class="text-muted">Chưa đạt</span>'}</td>
                    </tr>`;
            }).join('');
        }

        function renderRewardPanel(animate = false) {
            const program = REWARD_PROGRAMS.find((item) => item.id === rewardState.tab);
            const current = VIP_REWARDS[rewardState.level - 1];
            const panel = document.getElementById('rwPanel');
            const reachedCount = MILESTONES.filter((milestone) => current.expRequired >= milestone.exp).length;

            const isCustomTab = program.id === 'monthly' || program.id === 'weekly' || program.id === 'levelup' || program.id === 'birthday';
            
            const head = program.id === 'levelup'
                ? `<th scope="col">Cấp VIP</th><th scope="col">Tổng Nạp</th><th scope="col">Cược Hợp Lệ</th><th scope="col">${program.column}</th>`
                : program.id === 'birthday'
                    ? `<th scope="col">Cấp VIP</th><th scope="col">${program.column}</th>`
                    : (program.id === 'monthly' || program.id === 'weekly')
                        ? `<th scope="col">Cấp VIP</th><th scope="col">Cược Hợp Lệ</th><th scope="col">${program.column}</th>`
                        : program.field
                            ? `<th scope="col">Cấp</th><th scope="col">Hạng</th><th scope="col">${program.column}</th>`
                            : `<th scope="col">Mốc EXP tích lũy</th><th scope="col">${program.column}</th><th scope="col">Với VIP ${current.level}</th>`;

            function getCustomRows() {
                return VIP_REWARDS.map(reward => {
                    const isCurrent = reward.level === current.level;
                    
                    if (program.id === 'levelup') {
                        return `
                            <tr class="${isCurrent ? 'is-current' : ''}">
                                <td><button type="button" class="row-pick" data-pick="${reward.level}">VIP ${reward.level}</button>${isCurrent ? '<span class="rw-badge">Đang xem</span>' : ''}</td>
                                <td>${formatNumber(reward.upgradeDeposit)}</td>
                                <td>${formatNumber(reward.upgradeRequired)}</td>
                                <td class="rw-points">${formatNumber(reward.upgrade)}</td>
                            </tr>`;
                    }
                    if (program.id === 'birthday') {
                        return `
                            <tr class="${isCurrent ? 'is-current' : ''}">
                                <td><button type="button" class="row-pick" data-pick="${reward.level}">VIP ${reward.level}</button>${isCurrent ? '<span class="rw-badge">Đang xem</span>' : ''}</td>
                                <td class="rw-points">${formatNumber(reward.birthday)}</td>
                            </tr>`;
                    }
                    
                    const reqVal = program.id === 'weekly' ? reward.weeklyRequired : reward.monthlyRequired;
                    const bonusVal = program.id === 'weekly' ? reward.weekly : reward.monthly;
                    return `
                        <tr class="${isCurrent ? 'is-current' : ''}">
                            <td><button type="button" class="row-pick" data-pick="${reward.level}">VIP ${reward.level}</button>${isCurrent ? '<span class="rw-badge">Đang xem</span>' : ''}</td>
                            <td>${formatNumber(reqVal)}</td>
                            <td class="rw-points">${formatNumber(bonusVal)}</td>
                        </tr>`;
                }).join('');
            }

            const tbodyContent = isCustomTab ? getCustomRows() : (program.field ? buildLevelRows(program, current) : buildMilestoneRows(current));
            
            const currentStat = program.field
                ? { label: `VIP ${current.level} nhận`, value: isCustomTab ? formatNumber(current[program.field]) : formatLP(current[program.field]) }
                : { label: `Mốc đã đạt (VIP ${current.level})`, value: `${reachedCount} / ${MILESTONES.length}` };

            let extraHtml = '';
            if (program.id === 'monthly') {
                extraHtml = `
                    <div class="mt-6 rounded-xl bg-card border border-[var(--border)] p-5 text-sm text-muted shadow-sm">
                        <h4 class="font-bold text-gold mb-2 flex items-center gap-2"><span aria-hidden="true">✦</span> NỘI DUNG KHUYẾN MÃI <span>✦</span></h4>
                        <p class="mb-5 leading-relaxed">Nhằm tri ân và nâng tầm trải nghiệm cho hội viên, XX88 ra mắt chương trình ĐẶC QUYỀN VIP - LƯƠNG KHỦNG HÀNG THÁNG, dành riêng cho khách hàng VIP. Đây là đặc quyền cao cấp dành tặng cho các thành viên thân thiết. Chúc quý khách nhận thưởng lương hàng tháng rực rỡ!</p>
                        
                        <h4 class="font-bold text-gold mb-2 flex items-center gap-2"><span aria-hidden="true">✦</span> ĐIỀU KIỆN KHUYẾN MÃI <span>✦</span></h4>
                        <ul class="grid gap-2 leading-relaxed">
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Phương thức phát thưởng: Hệ thống phát thưởng trước 18h ngày 01 hàng tháng (Giờ GMT +8).</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Sau khi phát thưởng, thành viên truy cập tài khoản tiến hành nhận thưởng, khuyến mãi VIPTHANG có hiệu lực 7 ngày, quá thời gian sẽ hết hạn.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Tiền thưởng chỉ cần trải qua 1 vòng cược có thể rút tiền.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Thành viên gian lận, lạm dụng khuyến mãi sẽ không được tham gia khuyến mãi này. Nếu XX88 phát hiện có quyền thu hồi tiền khuyến mãi và tiền thắng nếu có.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>XX88 bảo lưu quyền thay đổi, dừng hoặc huỷ bỏ chương trình khuyến mãi này bất cứ lúc nào.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Tham gia nghĩa là bạn đồng ý với Quy tắc và điều kiện khuyến mãi.</span></li>
                        </ul>
                    </div>`;
            } else if (program.id === 'weekly') {
                extraHtml = `
                    <div class="mt-6 rounded-xl bg-card border border-[var(--border)] p-5 text-sm text-muted shadow-sm">
                        <h4 class="font-bold text-gold mb-2 flex items-center gap-2"><span aria-hidden="true">✦</span> NỘI DUNG KHUYẾN MÃI <span>✦</span></h4>
                        <p class="mb-5 leading-relaxed">Hàng tuần, XX88 mang đến những ưu đãi đặc quyền dành riêng cho thành viên VIP. Đây không chỉ là lời tri ân dành cho sự tin tưởng và đồng hành của quý hội viên, mà còn là cách để XX88 thể hiện sự trân trọng sâu sắc đối với mỗi thành viên. Chào mừng quý khách đến với phần thưởng VIP hàng tuần!</p>
                        
                        <h4 class="font-bold text-gold mb-2 flex items-center gap-2"><span aria-hidden="true">✦</span> ĐIỀU KIỆN KHUYẾN MÃI <span>✦</span></h4>
                        <ul class="grid gap-2 leading-relaxed">
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Phương thức phát thưởng: Hệ thống phát thưởng trước 18h thứ 2 hàng tuần (Giờ GMT +8).</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Sau khi phát thưởng, thành viên truy cập tài khoản tiến hành nhận thưởng, khuyến mãi VIPTUAN có hiệu lực 3 ngày, quá thời gian sẽ hết hạn.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Tiền thưởng chỉ cần trải qua 1 vòng cược có thể rút tiền.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Thành viên gian lận, lạm dụng khuyến mãi sẽ không được tham gia khuyến mãi này. Nếu XX88 phát hiện có quyền thu hồi tiền khuyến mãi và tiền thắng nếu có.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>XX88 bảo lưu quyền thay đổi, dừng hoặc huỷ bỏ chương trình khuyến mãi này bất cứ lúc nào.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Tham gia nghĩa là bạn đồng ý với Quy tắc và điều kiện khuyến mãi.</span></li>
                        </ul>
                    </div>`;
            } else if (program.id === 'levelup') {
                extraHtml = `
                    <div class="mt-6 rounded-xl bg-card border border-[var(--border)] p-5 text-sm text-muted shadow-sm">
                        <h4 class="font-bold text-gold mb-2 flex items-center gap-2"><span aria-hidden="true">✦</span> NỘI DUNG KHUYẾN MÃI <span>✦</span></h4>
                        <p class="mb-5 leading-relaxed">Kể từ 20/07/2025 tất cả thành viên của XX88 khi tham gia đặt cược các sản phẩm tại XX88, số tiền đặt cược sẽ được tích luỹ vĩnh viễn và sẽ được hưởng quyền lợi VIP trọn đời. Khi phát sinh giao dịch nạp tiền và đạt tới tích luỹ cược hợp lệ từ 30,000 điểm trở lên. Quý khách hàng sẽ được tham gia Câu lạc bộ VIP của chúng tôi, cấp VIP càng cao phúc lợi càng lớn.</p>
                        
                        <h4 class="font-bold text-gold mb-2 flex items-center gap-2"><span aria-hidden="true">✦</span> ĐIỀU KIỆN KHUYẾN MÃI <span>✦</span></h4>
                        <ul class="grid gap-2 leading-relaxed">
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Điều kiện thăng cấp : Mỗi tiếng đồng hồ hệ thống tự động kết toán 1 lần, nếu đạt được điều kiện cược hợp lệ và số tiền nạp cấp cao hơn sẽ tự động thăng cấp.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Thưởng thăng cấp : Phần thưởng được tự động phát sau khi lên cấp, mỗi cấp VIP sẽ được nhận 01 lần thưởng thăng cấp duy nhất.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Phương thức nhận thưởng : Phần thưởng được tự động phát sau khi thành viên đạt yêu cầu, chỉ cần thao tác bấm "Nhận thưởng"</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Tiền thưởng chỉ cần trải qua 1 vòng cược có thể rút tiền.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Thành viên gian lận, lạm dụng khuyến mãi sẽ không được tham gia khuyến mãi này. Nếu XX88 phát hiện có quyền thu hồi tiền khuyến mãi và tiền thắng nếu có.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>XX88 bảo lưu quyền thay đổi, dừng hoặc huỷ bỏ chương trình khuyến mãi này bất cứ lúc nào.</span></li>
                            <li class="flex gap-2"><span class="text-cyan" aria-hidden="true">✓</span><span>Tham gia nghĩa là bạn đồng ý với Quy tắc và điều kiện khuyến mãi.</span></li>
                        </ul>
                    </div>`;
            } else if (program.id === 'birthday') {
                extraHtml = `
                    <div class="mt-6 rounded-xl bg-card border border-[var(--border)] p-5 text-sm text-muted shadow-sm">
                        <h4 class="font-bold text-gold mb-2 flex items-center gap-2"><span aria-hidden="true">✦</span> NỘI DUNG KHUYẾN MÃI <span>✦</span></h4>
                        <p class="leading-relaxed">Tất cả thành viên XX88 từ VIP 1 trở lên, khi đã xác nhận ngày sinh trên tài khoản, đều có cơ hội nhận quà sinh nhật đặc quyền từ XX88, với giá trị lên đến 68,888 điểm.</p>
                    </div>`;
            }

            panel.setAttribute('aria-labelledby', `rw-tab-${program.id}`);
            panel.innerHTML = `
                <div class="${animate ? 'fade-in ' : ''}grid gap-6 lg:grid-cols-[340px_1fr]">
                    <div>
                        <div class="rw-banner">
                            <span class="rw-banner__icon" aria-hidden="true">${program.icon}</span>
                            <span class="rw-code">MÃ: ${program.code}</span>
                            <h3 class="relative mt-3 font-display text-xl font-black">${program.title}</h3>
                            <p class="relative mt-1 text-sm text-goldlight">${program.tagline}</p>
                        </div>
                        <dl class="mt-4 grid grid-cols-2 gap-3">
                            <div class="rw-stat"><dt>${currentStat.label}</dt><dd>${currentStat.value}</dd></div>
                            <div class="rw-stat"><dt>Mức cao nhất</dt><dd>${isCustomTab ? formatNumber(getProgramMax(program)) : formatLP(getProgramMax(program))}</dd></div>
                        </dl>
                        <ul class="mt-4 grid gap-2 text-sm text-muted">
                            ${program.rules.map((rule) => `<li class="flex gap-2"><span class="text-gold" aria-hidden="true">✦</span><span>${rule}</span></li>`).join('')}
                        </ul>
                        ${extraHtml}
                    </div>
                    <div class="rw-table-wrap" id="rwTableWrap">
                        <table class="rw-table">
                            <caption class="sr-only">Bảng ${program.title}</caption>
                            <thead><tr>${head}</tr></thead>
                            <tbody>${tbodyContent}</tbody>
                        </table>
                    </div>
                </div>`;

            // Keep the selected level centred inside the scrollable table
            const wrap = document.getElementById('rwTableWrap');
            const row = wrap.querySelector('tr.is-current');
            if (row) wrap.scrollTop = row.offsetTop - wrap.clientHeight / 2 + row.offsetHeight / 2;
        }

        function updateLevelPanel() {
            const reward = VIP_REWARDS[rewardState.level - 1];
            const range = document.getElementById('rwRange');
            range.value = reward.level;
            range.style.setProperty('--pct', `${((reward.level - 1) / 59) * 100}%`);
            range.setAttribute('aria-valuetext', `VIP ${reward.level}, hạng ${reward.tier.name}`);

            document.getElementById('rwLevel').textContent = `VIP ${reward.level}`;
            const group = getBadgeGroup(reward.level);
            const rangeStr = getBadgeRange(group);
            const tierLabel = document.getElementById('rwTier');
            tierLabel.textContent = `NHÓM VIP ${rangeStr}`;
            tierLabel.className = `rw-tier badge-g${group}`;
            document.getElementById('rwExp').textContent = formatNumber(reward.expRequired);
            document.getElementById('rwCard').innerHTML = memberCardHTML(reward.level, reward.tier);

            const stats = { rwUpgrade: reward.upgrade, rwWeekly: reward.weekly, rwMonthly: reward.monthly, rwBirthday: reward.birthday };
            Object.entries(stats).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (!element) return;
                element.textContent = formatLP(value);
                const box = element.closest('.rw-stat');
                if (box) {
                    box.classList.remove('bump');
                    void box.offsetWidth; // restart pop animation
                    box.classList.add('bump');
                }
            });

            document.getElementById('rwMinus').disabled = reward.level === 1;
            document.getElementById('rwPlus').disabled = reward.level === 60;

            document.querySelectorAll('#vipGrid .vip-card').forEach((card) => {
                const isSelected = Number(card.dataset.level) === reward.level;
                card.classList.toggle('is-selected', isSelected);
                card.setAttribute('aria-pressed', String(isSelected));
            });
        }

        function selectRewardLevel(level) {
            rewardState.level = Math.min(60, Math.max(1, Math.round(level) || 1));
            updateLevelPanel();
            renderRewardPanel();
        }

        function activateRewardTab(id, moveFocus = false) {
            rewardState.tab = id;
            document.querySelectorAll('#rwTabs .rw-tab').forEach((tab) => {
                const isActive = tab.dataset.tab === id;
                tab.setAttribute('aria-selected', String(isActive));
                tab.tabIndex = isActive ? 0 : -1;
                if (isActive && moveFocus) tab.focus();
            });
            renderRewardPanel(true);
        }

        function revealRewardPanel() {
            const panel = document.getElementById('rewardLevelPanel');
            const rect = panel.getBoundingClientRect();
            if (rect.top < 0 || rect.top > window.innerHeight * 0.6) {
                panel.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
            }
        }

        function setupRewards() {
            renderRewardTabs();
            const range = document.getElementById('rwRange');
            range.addEventListener('input', () => selectRewardLevel(Number(range.value)));
            document.getElementById('rwMinus').addEventListener('click', () => selectRewardLevel(rewardState.level - 1));
            document.getElementById('rwPlus').addEventListener('click', () => selectRewardLevel(rewardState.level + 1));

            // Tabs: click + arrow-key navigation
            const tabList = document.getElementById('rwTabs');
            tabList.addEventListener('click', (event) => {
                const tab = event.target.closest('[data-tab]');
                if (tab) activateRewardTab(tab.dataset.tab);
            });
            tabList.addEventListener('keydown', (event) => {
                const ids = REWARD_PROGRAMS.map((program) => program.id);
                const index = ids.indexOf(rewardState.tab);
                const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: ids.length - 1 };
                if (!(event.key in moves)) return;
                event.preventDefault();
                activateRewardTab(ids[(moves[event.key] + ids.length) % ids.length], true);
            });

            // Pick a level from the table
            document.getElementById('rwPanel').addEventListener('click', (event) => {
                const pick = event.target.closest('[data-pick]');
                if (pick) selectRewardLevel(Number(pick.dataset.pick));
            });

            // Pick a level from the VIP grid (mouse + keyboard)
            const grid = document.getElementById('vipGrid');
            const pickFromGrid = (card) => {
                selectRewardLevel(Number(card.dataset.level));
                revealRewardPanel();
            };
            grid.addEventListener('click', (event) => {
                const card = event.target.closest('.vip-card');
                if (card) pickFromGrid(card);
            });
            grid.addEventListener('keydown', (event) => {
                const card = event.target.closest('.vip-card');
                if (!card || (event.key !== 'Enter' && event.key !== ' ')) return;
                event.preventDefault();
                pickFromGrid(card);
            });

            selectRewardLevel(rewardState.level);
        }

        // ================= Slider =================
        let currentSlide = 0;
        let autoSlideTimer = null;
        let isSliderPaused = false;

        function updateSlider() {
            const track = document.getElementById('sliderTrack');
            track.style.transform = `translate3d(${-currentSlide * 100}%, 0, 0)`;
            track.querySelectorAll('.slide').forEach((slide, index) => {
                const isActive = index === currentSlide;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', String(!isActive));
                slide.inert = !isActive; // keep hidden slides out of tab order
            });
            document.querySelectorAll('#sliderDots .slider-dot').forEach((dot, index) => {
                dot.setAttribute('aria-current', String(index === currentSlide));
            });
        }

        function goToSlide(index) {
            const total = FEATURED_LEVELS.length;
            currentSlide = (index + total) % total;
            updateSlider();
        }
        const nextSlide = () => goToSlide(currentSlide + 1);
        const prevSlide = () => goToSlide(currentSlide - 1);

        function stopAutoSlide() {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
        function startAutoSlide() {
            if (prefersReducedMotion || isSliderPaused) return;
            stopAutoSlide();
            autoSlideTimer = setInterval(nextSlide, CONFIG.autoSlideDelay);
        }
        function pauseSlider() { isSliderPaused = true; stopAutoSlide(); }
        function resumeSlider() { isSliderPaused = false; startAutoSlide(); }

        function setupSlider() {
            const slider = document.getElementById('featuredSlider');
            const viewport = document.getElementById('sliderViewport');

            document.getElementById('sliderNext').addEventListener('click', () => { nextSlide(); startAutoSlide(); });
            document.getElementById('sliderPrev').addEventListener('click', () => { prevSlide(); startAutoSlide(); });
            document.getElementById('sliderDots').addEventListener('click', (event) => {
                const dot = event.target.closest('.slider-dot');
                if (!dot) return;
                goToSlide(Number(dot.dataset.index));
                startAutoSlide();
            });

            // Pause on hover / keyboard focus, resume on leave
            slider.addEventListener('mouseenter', pauseSlider);
            slider.addEventListener('mouseleave', resumeSlider);
            slider.addEventListener('focusin', pauseSlider);
            slider.addEventListener('focusout', (event) => {
                if (!slider.contains(event.relatedTarget)) resumeSlider();
            });

            // Keyboard arrows
            slider.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowRight') { event.preventDefault(); nextSlide(); }
                if (event.key === 'ArrowLeft') { event.preventDefault(); prevSlide(); }
            });

            // Touch swipe (mobile)
            let touchStartX = 0;
            let touchStartY = 0;
            viewport.addEventListener('touchstart', (event) => {
                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
                stopAutoSlide();
            }, { passive: true });
            viewport.addEventListener('touchend', (event) => {
                const deltaX = event.changedTouches[0].clientX - touchStartX;
                const deltaY = event.changedTouches[0].clientY - touchStartY;
                if (Math.abs(deltaX) > CONFIG.swipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
                    deltaX < 0 ? nextSlide() : prevSlide();
                }
                isSliderPaused = false;
                startAutoSlide();
            }, { passive: true });

            // Save resources when the tab is hidden
            document.addEventListener('visibilitychange', () => {
                document.hidden ? stopAutoSlide() : startAutoSlide();
            });

            updateSlider();
            startAutoSlide();
        }

        // ================= Filters & VIP Collapse =================
        const filterState = { range: 'all', query: '', isExpanded: false };
        const VIP_COLLAPSED_COUNT = 12; // Show first 12 levels initially when "all" is selected

        function applyFilters() {
            const grid = document.getElementById('vipGrid');
            const cards = grid.querySelectorAll('.vip-card');
            const query = filterState.query.replace(/\D/g, '');
            const [min, max] = filterState.range === 'all' ? [1, 60] : filterState.range.split('-').map(Number);
            let visibleCount = 0;

            const isDefaultAll = filterState.range === 'all' && !query;

            cards.forEach((card) => {
                const level = Number(card.dataset.level);
                let isVisible = query ? level === Number(query) : (level >= min && level <= max);
                if (isDefaultAll && !filterState.isExpanded && level > VIP_COLLAPSED_COUNT) {
                    isVisible = false;
                }
                card.hidden = !isVisible;
                card.classList.remove('fade-in');
                if (isVisible) visibleCount += 1;
            });

            void grid.offsetWidth; // restart fade animation with a single reflow
            cards.forEach((card) => { if (!card.hidden) card.classList.add('fade-in'); });

            document.getElementById('vipCount').textContent = `Đang hiển thị ${visibleCount} / ${vipLevels.length} cấp độ`;
            document.getElementById('vipEmpty').classList.toggle('hidden', visibleCount > 0);

            // Toggle button visibility and text
            const toggleWrap = document.getElementById('vipToggleWrap');
            if (toggleWrap) {
                if (isDefaultAll) {
                    toggleWrap.classList.remove('hidden');
                    const textEl = document.getElementById('vipToggleText');
                    const iconEl = document.getElementById('vipToggleIcon');
                    if (filterState.isExpanded) {
                        textEl.textContent = 'Thu gọn bớt 48 cấp độ VIP';
                        iconEl.style.transform = 'rotate(180deg)';
                    } else {
                        textEl.textContent = `Xem tất cả ${vipLevels.length} cấp độ VIP`;
                        iconEl.style.transform = 'rotate(0deg)';
                    }
                } else {
                    toggleWrap.classList.add('hidden');
                }
            }
        }

        function setActiveFilterButton(range) {
            document.querySelectorAll('#vipFilters .filter-btn').forEach((button) => {
                button.setAttribute('aria-pressed', String(button.dataset.filter === range));
            });
        }

        function setupFilters() {
            const searchInput = document.getElementById('vipSearch');

            document.getElementById('vipFilters').addEventListener('click', (event) => {
                const button = event.target.closest('.filter-btn');
                if (!button) return;
                filterState.range = button.dataset.filter;
                filterState.query = '';
                searchInput.value = '';
                setActiveFilterButton(filterState.range);
                applyFilters();
            });

            searchInput.addEventListener('input', () => {
                filterState.query = searchInput.value.trim();
                filterState.range = 'all';
                setActiveFilterButton('all');
                applyFilters();
            });

            const toggleBtn = document.getElementById('vipToggleBtn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    filterState.isExpanded = !filterState.isExpanded;
                    applyFilters();
                    if (!filterState.isExpanded) {
                        document.getElementById('levels').scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            }

            // "Xem VIP xx" buttons inside the slider
            document.addEventListener('click', (event) => {
                const link = event.target.closest('[data-show-level]');
                if (!link) return;
                searchInput.value = link.dataset.showLevel;
                searchInput.dispatchEvent(new Event('input'));
                selectRewardLevel(Number(link.dataset.showLevel));
            });
        }

        // ================= FAQ =================
        function setupFaq() {
            document.querySelectorAll('#faqList .faq-q').forEach((button) => {
                button.addEventListener('click', () => {
                    const item = button.closest('.faq-item');
                    const willOpen = !item.classList.contains('is-open');
                    item.classList.toggle('is-open', willOpen);
                    button.setAttribute('aria-expanded', String(willOpen));
                });
            });
        }

        // ================= Navigation =================
        function setupNavigation() {
            const header = document.getElementById('siteHeader');
            const navLinks = document.querySelectorAll('[data-nav]');

            const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();

            // Highlight the menu item of the section currently in view
            if (!('IntersectionObserver' in window)) return;
            const sectionIds = [...new Set([...navLinks].map((link) => link.getAttribute('href').slice(1)))];
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach((link) => {
                        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
                        link.classList.toggle('is-active', isActive);
                        isActive ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current');
                    });
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            sectionIds.forEach((id) => {
                const section = document.getElementById(id);
                if (section) observer.observe(section);
            });
        }

        // ================= Mobile menu =================
        function setupMobileMenu() {
            const toggle = document.getElementById('menuToggle');
            const menu = document.getElementById('mobileMenu');

            const setMenu = (open) => {
                menu.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', String(open));
                toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
            };

            toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
            menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
            });
            window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenu(false); });
        }

        // ================= Animations =================
        function setupAnimations() {
            const items = document.querySelectorAll('.reveal');
            if (!('IntersectionObserver' in window) || prefersReducedMotion) {
                items.forEach((item) => item.classList.add('is-visible'));
                return;
            }
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            items.forEach((item) => observer.observe(item));
        }

        // Subtle 3D tilt on the hero card (mouse devices only)
        function setupHeroTilt() {
            const stack = document.getElementById('heroStack');
            const tilt = document.getElementById('heroTilt');
            if (prefersReducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
            stack.addEventListener('mousemove', (event) => {
                const rect = stack.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                tilt.style.setProperty('--ry', `${x * 14}deg`);
                tilt.style.setProperty('--rx', `${-y * 14}deg`);
            });
            stack.addEventListener('mouseleave', () => {
                tilt.style.setProperty('--ry', '0deg');
                tilt.style.setProperty('--rx', '0deg');
            });
        }

        // Lightweight floating particles (limited count for performance)
        function createParticles() {
            if (prefersReducedMotion) return;
            const container = document.getElementById('bgParticles');
            const isMobile = window.matchMedia('(max-width: 767px)').matches;
            const count = isMobile ? CONFIG.particles.mobile : CONFIG.particles.desktop;
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < count; i += 1) {
                const particle = document.createElement('span');
                const size = Math.random() * 2.5 + 1;
                const isGold = Math.random() < 0.35;
                particle.className = 'particle';
                particle.style.cssText = `
                    left:${Math.random() * 100}%;
                    width:${size}px; height:${size}px;
                    background:${isGold ? '#FFE7A0' : '#7FD8FF'};
                    box-shadow:0 0 ${size * 4}px ${isGold ? 'rgba(245,196,81,.8)' : 'rgba(0,200,255,.8)'};
                    --o:${(Math.random() * 0.5 + 0.25).toFixed(2)};
                    --dx:${(Math.random() * 80 - 40).toFixed(0)}px;
                    animation-duration:${(Math.random() * 16 + 14).toFixed(1)}s;
                    animation-delay:-${(Math.random() * 30).toFixed(1)}s;`;
                fragment.appendChild(particle);
            }
            container.appendChild(fragment);
        }

        // ================= Pique text toggle =================
        function setupPiqueToggle() {
            const btn = document.getElementById('piqueToggleBtn');
            const extra = document.getElementById('piqueExtraText');
            const textEl = document.getElementById('piqueToggleText');
            const arrowEl = document.getElementById('piqueToggleArrow');
            if (!btn || !extra) return;

            let isExpanded = true;
            btn.addEventListener('click', () => {
                isExpanded = !isExpanded;
                if (isExpanded) {
                    extra.style.maxHeight = extra.scrollHeight + 'px';
                    extra.style.opacity = '1';
                    textEl.textContent = 'Ẩn bớt';
                    arrowEl.textContent = '∧';
                } else {
                    extra.style.maxHeight = '0px';
                    extra.style.opacity = '0';
                    textEl.textContent = 'Xem thêm';
                    arrowEl.textContent = '∨';
                }
            });
        }

        // ================= Xử lý chuyển điểm =================
        function setupTransferFeature() {
            const transferSection = document.getElementById('transfer');
            const formView = document.getElementById('tfFormView');
            const successView = document.getElementById('tfSuccessView');
            const form = document.getElementById('tfForm');

            const sourceInput = document.getElementById('tfSource');
            const targetInput = document.getElementById('tfTarget');
            const amountInput = document.getElementById('tfAmount');

            const sourceError = document.getElementById('tfSourceError');
            const targetError = document.getElementById('tfTargetError');
            const amountError = document.getElementById('tfAmountError');
            const captchaError = document.getElementById('tfCaptchaError');

            const turnstileBox = document.getElementById('tfTurnstileBox');
            const checkbox = document.getElementById('tfCheckbox');
            const turnstileLabel = document.getElementById('tfTurnstileLabel');

            const submitBtn = document.getElementById('tfSubmitBtn');
            const btnText = document.getElementById('tfBtnText');
            const closeSuccessBtn = document.getElementById('tfCloseSuccessBtn');

            const receiptSource = document.getElementById('tfReceiptSource');
            const receiptTarget = document.getElementById('tfReceiptTarget');
            const receiptAmount = document.getElementById('tfReceiptAmount');
            const successDate = document.getElementById('tfSuccessDate');

            let isCaptchaVerified = false;
            let isCaptchaLoading = false;
            let isSubmitting = false;

            // Xử lý che mờ / hiện rõ logo XX88 | KJC, link tổng X88T.NET, số tiền, gợi ý số tiền và thông tin nhạy cảm khi Live
            const badgeWrapper = document.getElementById('tfBadgeWrapper');
            const badgeContent = document.getElementById('tfBadgeContent');
            const ruleLink = document.getElementById('tfRuleLink');
            const ruleUnit = document.getElementById('tfRuleUnit');
            const amountLabel = document.getElementById('tfAmountLabel');
            const amountBadge = document.getElementById('tfAmountBadge');
            const quickPills = document.getElementById('tfQuickPills');
            const quickPillsTitle = document.getElementById('tfQuickPillsTitle');
            const receiptAmountLabel = document.getElementById('tfReceiptAmountLabel');
            let isBadgeBlurred = false;

            function updateBadgeBlurState(blurred) {
                isBadgeBlurred = blurred;
                const blurClass = 'tf-badge-blur-filter';
                const clearClass = 'tf-badge-clear-filter';

                if (transferSection) {
                    if (isBadgeBlurred) {
                        transferSection.classList.add('tf-live-blur-active');
                        transferSection.classList.remove('tf-live-clear-mode');
                    } else {
                        transferSection.classList.remove('tf-live-blur-active');
                        transferSection.classList.add('tf-live-clear-mode');
                    }
                }

                const applyBlur = (el) => {
                    if (!el) return;
                    if (isBadgeBlurred) {
                        el.classList.add(blurClass);
                        el.classList.remove(clearClass);
                    } else {
                        el.classList.remove(blurClass);
                        el.classList.add(clearClass);
                    }
                };

                // Nhãn hiệu, tài khoản nguồn
                applyBlur(badgeContent);
                applyBlur(sourceInput);
                applyBlur(receiptSource);

                // Số tiền, Đơn vị: VND, Gợi ý số tiền
                applyBlur(amountLabel);
                applyBlur(amountBadge);
                applyBlur(quickPills);
                applyBlur(ruleUnit);
                applyBlur(receiptAmount);
                applyBlur(receiptAmountLabel);

                // Các dòng số tiền trong Live Feed
                document.querySelectorAll('.tf-feed-amount').forEach(applyBlur);

                const titleText = isBadgeBlurred ? 'Đang che mờ bảo vệ Live (Nhấp để hiện rõ)' : 'Đang hiện rõ (Nhấp để che mờ)';
                [badgeWrapper, sourceInput, receiptSource, amountBadge, amountLabel, ruleUnit, quickPills, quickPillsTitle, receiptAmount].forEach(el => {
                    if (el) el.setAttribute('title', titleText);
                });
            }

            updateBadgeBlurState(false);

            const blurInteractiveEls = [badgeWrapper, sourceInput, receiptSource, amountBadge, amountLabel, ruleUnit, quickPillsTitle, receiptAmount];
            blurInteractiveEls.forEach(el => {
                if (el) {
                    el.addEventListener('click', () => {
                        updateBadgeBlurState(!isBadgeBlurred);
                    });
                }
            });

            if (badgeWrapper) {
                badgeWrapper.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        updateBadgeBlurState(!isBadgeBlurred);
                    }
                });
            }

            // Cho phép nhấp vào bất kỳ số tiền nào trong Live Feed để bật/tắt che mờ
            const liveFeedBox = document.getElementById('tfLiveFeed');
            if (liveFeedBox) {
                liveFeedBox.addEventListener('click', (e) => {
                    if (e.target && e.target.classList.contains('tf-feed-amount')) {
                        updateBadgeBlurState(!isBadgeBlurred);
                    }
                });
            }

            function scrollToTransfer() {
                if (!transferSection) return;
                transferSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
                setTimeout(() => {
                    if (targetInput) targetInput.focus();
                }, 400);
            }

            function resetForm() {
                if (!form) return;
                form.reset();
                if (sourceInput) {
                    sourceInput.value = 'XX88_VIP_REWARDS';
                    sourceInput.classList.remove('is-invalid');
                }
                targetInput.classList.remove('is-invalid');
                amountInput.classList.remove('is-invalid');
                if (sourceError) sourceError.style.display = 'none';
                targetError.style.display = 'none';
                amountError.style.display = 'none';
                captchaError.style.display = 'none';

                isCaptchaVerified = false;
                isCaptchaLoading = false;
                isSubmitting = false;

                const procModal = document.getElementById('tfProcessingModal');
                if (procModal) procModal.style.display = 'none';

                turnstileBox.classList.remove('verified');
                turnstileBox.setAttribute('aria-checked', 'false');
                checkbox.className = 'tf-checkbox';
                checkbox.innerHTML = '';
                turnstileLabel.textContent = 'Verify you are human';
                turnstileLabel.style.color = '#cbd5e1';

                submitBtn.disabled = false;
                btnText.textContent = 'XÁC NHẬN CHUYỂN ĐIỂM';

                formView.style.display = 'block';
                successView.style.display = 'none';
            }

            // Quick Pill buttons
            document.querySelectorAll('.tf-pill-btn').forEach((pill) => {
                pill.addEventListener('click', () => {
                    const val = pill.dataset.val;
                    if (amountInput) {
                        amountInput.value = val;
                        amountInput.classList.remove('is-invalid');
                        amountError.style.display = 'none';
                        amountInput.focus();
                    }
                });
            });

            // Nav & Hero buttons navigation
            document.querySelectorAll('#openTransferBtnNav, #openTransferBtnMobile, #openTransferBtnHero, [href="#transfer"]').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    scrollToTransfer();
                });
            });

            if (closeSuccessBtn) {
                closeSuccessBtn.addEventListener('click', () => {
                    resetForm();
                    scrollToTransfer();
                });
            }

            if (window.location.hash === '#transfer') {
                setTimeout(scrollToTransfer, 200);
            }
            window.addEventListener('hashchange', () => {
                if (window.location.hash === '#transfer') scrollToTransfer();
            });

            // Turnstile captcha verification simulation
            if (turnstileBox) {
                turnstileBox.addEventListener('click', () => {
                    if (isCaptchaVerified || isCaptchaLoading) return;
                    isCaptchaLoading = true;
                    captchaError.style.display = 'none';
                    checkbox.className = 'tf-checkbox loading';
                    turnstileLabel.textContent = 'Đang xác minh...';

                    setTimeout(() => {
                        isCaptchaLoading = false;
                        isCaptchaVerified = true;
                        checkbox.className = 'tf-checkbox checked';
                        checkbox.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
                        turnstileBox.classList.add('verified');
                        turnstileBox.setAttribute('aria-checked', 'true');
                        turnstileLabel.textContent = 'Verify you are human';
                        turnstileLabel.style.color = '#22c55e';
                    }, 500);
                });
            }

            // Real-time input handling & validation cleanup (Tự động thêm dấu phẩy định dạng hàng nghìn)
            function formatNumberCommas(val) {
                const digits = val.replace(/\D/g, '');
                if (!digits) return '';
                return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }

            if (amountInput) {
                amountInput.addEventListener('input', () => {
                    const rawVal = amountInput.value;
                    const cursorPos = amountInput.selectionStart || 0;
                    const digitsBeforeCursor = rawVal.slice(0, cursorPos).replace(/\D/g, '').length;

                    const formatted = formatNumberCommas(rawVal);
                    amountInput.value = formatted;

                    if (digitsBeforeCursor === 0) {
                        amountInput.setSelectionRange(0, 0);
                    } else {
                        let newPos = 0;
                        let count = 0;
                        for (let i = 0; i < formatted.length; i++) {
                            if (/\d/.test(formatted[i])) count++;
                            if (count === digitsBeforeCursor) {
                                newPos = i + 1;
                                break;
                            }
                        }
                        amountInput.setSelectionRange(newPos, newPos);
                    }

                    amountInput.classList.remove('is-invalid');
                    amountError.style.display = 'none';
                });
            }

            if (sourceInput) {
                sourceInput.addEventListener('input', () => {
                    sourceInput.classList.remove('is-invalid');
                    sourceError.style.display = 'none';
                });
            }

            if (targetInput) {
                targetInput.addEventListener('input', () => {
                    targetInput.classList.remove('is-invalid');
                    targetError.style.display = 'none';
                });
            }

            // Form Submit & High-Tech HUD Verification Sequence
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;

                    let isValid = true;
                    const sourceVal = 'XX88_VIP_REWARDS';
                    const targetVal = targetInput.value.trim();
                    const rawAmount = amountInput.value.replace(/\D/g, '');
                    const amountVal = parseInt(rawAmount, 10);

                    // 1. Target account: >= 4 characters
                    if (!targetVal || targetVal.length < 4) {
                        targetInput.classList.add('is-invalid');
                        targetError.textContent = 'Vui lòng điền tài khoản nhận điểm (từ 4 ký tự trở lên)!';
                        targetError.style.display = 'block';
                        isValid = false;
                    } else {
                        targetInput.classList.remove('is-invalid');
                        targetError.style.display = 'none';
                    }

                    // 2. Amount: >= 1,000 VND (Không giới hạn tối đa 999 điểm)
                    if (isNaN(amountVal) || amountVal < 1000) {
                        amountInput.classList.add('is-invalid');
                        amountError.textContent = 'Vui lòng nhập số tiền hợp lệ (tối thiểu 1,000 VND)!';
                        amountError.style.display = 'block';
                        isValid = false;
                    } else {
                        amountInput.classList.remove('is-invalid');
                        amountError.style.display = 'none';
                    }

                    // 3. Captcha verification
                    if (!isCaptchaVerified) {
                        captchaError.style.display = 'block';
                        isValid = false;
                    } else {
                        captchaError.style.display = 'none';
                    }

                    if (!isValid) return;

                    // Hiệu ứng xác thực đa tầng bảo mật KJC Secure Gateway
                    isSubmitting = true;
                    submitBtn.disabled = true;
                    btnText.textContent = 'Đang kích hoạt KJC Gateway...';

                    const procModal = document.getElementById('tfProcessingModal');
                    const txIdEl = document.getElementById('tfTxId');
                    const procMainTitle = document.getElementById('tfProcMainTitle');
                    const procSubTitle = document.getElementById('tfProcSubTitle');
                    const procProgressBar = document.getElementById('tfProcProgressBar');

                    const step1 = document.getElementById('tfStep1');
                    const stepIcon1 = document.getElementById('tfStepIcon1');
                    const stepStatus1 = document.getElementById('tfStepStatus1');

                    const step2 = document.getElementById('tfStep2');
                    const stepIcon2 = document.getElementById('tfStepIcon2');
                    const stepStatus2 = document.getElementById('tfStepStatus2');

                    const step3 = document.getElementById('tfStep3');
                    const stepIcon3 = document.getElementById('tfStepIcon3');
                    const step3Label = document.getElementById('tfStep3Label');
                    const stepStatus3 = document.getElementById('tfStepStatus3');

                    const spinnerSvg = `<svg class="w-3.5 h-3.5 animate-spin text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>`;
                    const checkSvg = `<svg class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

                    // 1. Khởi tạo modal xác thực
                    if (txIdEl) txIdEl.textContent = 'TX-' + Math.floor(100000 + Math.random() * 900000);
                    if (step3Label) step3Label.textContent = `Định danh tài khoản [${targetVal}] & Ký số lệnh`;

                    if (procProgressBar) procProgressBar.style.width = '20%';
                    if (procMainTitle) procMainTitle.textContent = 'ĐANG KẾT NỐI HỆ THỐNG KJC';
                    if (procSubTitle) procSubTitle.textContent = 'Đang thiết lập kênh truyền bảo mật 256-bit SSL...';

                    if (step1) { step1.className = 'tf-step-item active'; }
                    if (stepIcon1) stepIcon1.innerHTML = spinnerSvg;
                    if (stepStatus1) { stepStatus1.textContent = 'Đang kết nối'; stepStatus1.className = 'text-[11px] font-bold text-cyan ml-auto'; }

                    if (step2) { step2.className = 'tf-step-item opacity-40'; }
                    if (stepIcon2) stepIcon2.innerHTML = '○';
                    if (stepStatus2) { stepStatus2.textContent = 'Chờ duyệt'; stepStatus2.className = 'text-[11px] font-bold text-muted ml-auto'; }

                    if (step3) { step3.className = 'tf-step-item opacity-40'; }
                    if (stepIcon3) stepIcon3.innerHTML = '○';
                    if (stepStatus3) { stepStatus3.textContent = 'Chờ ký'; stepStatus3.className = 'text-[11px] font-bold text-muted ml-auto'; }

                    if (procModal) procModal.style.display = 'flex';

                    // Giai đoạn 2 (sau 800ms): Hoàn tất Bước 1, chạy Bước 2
                    setTimeout(() => {
                        if (step1) { step1.className = 'tf-step-item completed'; }
                        if (stepIcon1) stepIcon1.innerHTML = checkSvg;
                        if (stepStatus1) { stepStatus1.textContent = 'Đã kết nối ✓'; stepStatus1.className = 'text-[11px] font-bold text-emerald-400 ml-auto'; }

                        if (step2) { step2.className = 'tf-step-item active'; }
                        if (stepIcon2) stepIcon2.innerHTML = spinnerSvg;
                        if (stepStatus2) { stepStatus2.textContent = 'Đang kiểm tra'; stepStatus2.className = 'text-[11px] font-bold text-cyan ml-auto'; }

                        if (procProgressBar) procProgressBar.style.width = '55%';
                        if (procMainTitle) procMainTitle.textContent = 'XÁC THỰC BẢO MẬT HỆ THỐNG';
                        if (procSubTitle) procSubTitle.textContent = 'Kiểm tra quỹ xuất điểm & mã hóa Cloudflare Enterprise...';
                    }, 800);

                    // Giai đoạn 3 (sau 1600ms): Hoàn tất Bước 2, chạy Bước 3
                    setTimeout(() => {
                        if (step2) { step2.className = 'tf-step-item completed'; }
                        if (stepIcon2) stepIcon2.innerHTML = checkSvg;
                        if (stepStatus2) { stepStatus2.textContent = 'Hợp lệ ✓'; stepStatus2.className = 'text-[11px] font-bold text-emerald-400 ml-auto'; }

                        if (step3) { step3.className = 'tf-step-item active'; }
                        if (stepIcon3) stepIcon3.innerHTML = spinnerSvg;
                        if (stepStatus3) { stepStatus3.textContent = 'Đang ký số'; stepStatus3.className = 'text-[11px] font-bold text-cyan ml-auto'; }

                        if (procProgressBar) procProgressBar.style.width = '88%';
                        if (procMainTitle) procMainTitle.textContent = 'KÝ SỐ ĐIỆN TỬ GIAO DỊCH';
                        if (procSubTitle) procSubTitle.textContent = `Xác thực định danh [${targetVal}] và ký phát hành điểm...`;
                    }, 1600);

                    // Giai đoạn 4 (sau 2400ms): Hoàn tất Bước 3
                    setTimeout(() => {
                        if (step3) { step3.className = 'tf-step-item completed'; }
                        if (stepIcon3) stepIcon3.innerHTML = checkSvg;
                        if (stepStatus3) { stepStatus3.textContent = 'Đã ký số ✓'; stepStatus3.className = 'text-[11px] font-bold text-emerald-400 ml-auto'; }

                        if (procProgressBar) procProgressBar.style.width = '100%';
                        if (procMainTitle) procMainTitle.textContent = 'XÁC THỰC HOÀN TẤT';
                        if (procSubTitle) procSubTitle.textContent = 'Giao dịch chuyển điểm đã được phê duyệt thành công!';
                    }, 2400);

                    // Giai đoạn 5 (sau 2800ms): Ẩn modal và xuất biên lai thành công
                    setTimeout(() => {
                        if (procModal) procModal.style.display = 'none';

                        const now = new Date();
                        const pad = (n) => String(n).padStart(2, '0');
                        const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
                        const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
                        successDate.textContent = `Ngày chuyển: ${timeStr} ${dateStr}`;

                        receiptSource.textContent = sourceVal;
                        receiptTarget.textContent = targetVal;
                        receiptAmount.textContent = `${amountVal.toLocaleString('en-US')} VND`;

                        formView.style.display = 'none';
                        successView.style.display = 'block';
                        isSubmitting = false;

                        // Cập nhật lên Live Feed giao dịch tức thì
                        const feed = document.getElementById('tfLiveFeed');
                        if (feed) {
                            const maskedTarget = targetVal.slice(0, 3) + '***' + targetVal.slice(-2);
                            const newFeedItem = document.createElement('div');
                            newFeedItem.className = 'tf-live-feed-item';
                            newFeedItem.innerHTML = `
                                <div class="flex items-center gap-2">
                                    <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan/15 text-cyan border border-cyan/30 text-[11px] font-bold">VIP</span>
                                    <span class="font-mono font-bold text-slate-300">${maskedTarget}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="font-bold text-cyan tf-feed-amount tf-live-blur-target ${isBadgeBlurred ? 'tf-badge-blur-filter' : 'tf-badge-clear-filter'} cursor-pointer select-none" title="${isBadgeBlurred ? 'Đang che mờ bảo vệ Live (Nhấp để hiện rõ)' : 'Đang hiện rõ (Nhấp để che mờ)'}">+${amountVal.toLocaleString('en-US')} VND</span>
                                    <span class="text-[11px] text-emerald-400">Vừa xong</span>
                                </div>`;
                            feed.prepend(newFeedItem);
                            if (feed.children.length > 5) feed.lastElementChild.remove();
                        }
                    }, 2800);
                });
            }

            // Simulated background live feed updates - Danh sách 76 tài khoản hội viên VIP & các mốc điểm may mắn
            const FEED_USERS = [
                // 26 tài khoản ban đầu
                'anh***88', 'tuan***79', 'phuong***68', 'king***99', 'long***18', 'trang***88',
                'hoang***66', 'dung***89', 'nam***007', 'linh***92', 'hai***36', 'phuc***77',
                'viet***99', 'thang***19', 'hien***28', 'thao***86', 'ngoc***38', 'tien***68',
                'khanh***95', 'cuong***11', 'quang***83', 'duc***79', 'minh***68', 'son***24',
                'yen***88', 'bac***99',
                // 50 tài khoản mới bổ sung thêm
                'bao***38', 'huyen***68', 'loc***88', 'dat***79', 'phat***88', 'tai***68',
                'nguyen***38', 'thanh***188', 'vu***288', 'kha***688', 'kim***38', 'van***68',
                'tai***99', 'thinh***88', 'diep***38', 'trung***68', 'hung***88', 'mai***79',
                'tam***38', 'khoi***68', 'an***88', 'binh***188', 'giang***288', 'tram***688',
                'thuy***38', 'chau***68', 'loi***88', 'quyen***79', 'tan***38', 'loi***68',
                'nhan***88', 'kien***188', 'nghia***288', 'phong***688', 'trinh***38', 'nhung***68',
                'sang***88', 'huy***79', 'trieu***38', 'thuan***68', 'vinh***88', 'toan***188',
                'quang***288', 'tam***688', 'quynh***38', 'tuyet***68', 'nghi***88', 'phu***79',
                'hoa***38', 'dong***68'
            ];
            // Danh sách chính xác 50 mốc điểm giao dịch theo yêu cầu
            const FEED_POINTS = [
                368000, 200000, 1288000, 57000, 500000, 168000, 800000, 247000, 38000, 1000000,
                425000, 88000, 135000, 600000, 688000, 100000, 273000, 528000, 350000, 1688000,
                158000, 700000, 238000, 450000, 68000, 320000, 588000, 175000, 900000, 283000,
                2888000, 125000, 388000, 75000, 215000, 468000, 300000, 628000, 150000, 550000,
                328000, 250000, 478000, 1200000, 180000, 728000, 400000, 98000, 658000, 168000
            ];
            const FEED_TIMES = ['Vừa xong', 'Vài giây trước', '10s trước', '15s trước', 'Vừa xong'];
            let lastUser = '';

            setInterval(() => {
                if (document.hidden) return;
                const feed = document.getElementById('tfLiveFeed');
                if (!feed) return;

                let u;
                do {
                    u = FEED_USERS[Math.floor(Math.random() * FEED_USERS.length)];
                } while (u === lastUser);

                lastUser = u;

                const pts = FEED_POINTS[Math.floor(Math.random() * FEED_POINTS.length)];
                const timeText = FEED_TIMES[Math.floor(Math.random() * FEED_TIMES.length)];
                const isGold = pts >= 1000000;
                const ptsClass = isGold ? 'text-gold' : 'text-cyan';
                const badgeClass = isGold 
                    ? 'bg-gold/15 text-gold border-gold/30' 
                    : 'bg-cyan/15 text-cyan border-cyan/30';

                const item = document.createElement('div');
                item.className = 'tf-live-feed-item';
                item.innerHTML = `
                    <div class="flex items-center gap-2">
                        <span class="inline-flex items-center justify-center w-6 h-6 rounded-full ${badgeClass} border text-[11px] font-bold">VIP</span>
                        <span class="font-mono font-bold text-slate-300">${u}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-bold ${ptsClass} tf-feed-amount tf-live-blur-target ${isBadgeBlurred ? 'tf-badge-blur-filter' : 'tf-badge-clear-filter'} cursor-pointer select-none" title="${isBadgeBlurred ? 'Đang che mờ bảo vệ Live (Nhấp để hiện rõ)' : 'Đang hiện rõ (Nhấp để che mờ)'}">+${pts.toLocaleString('en-US')} VND</span>
                        <span class="text-[11px] text-muted">${timeText}</span>
                    </div>`;
                feed.prepend(item);
                if (feed.children.length > 5) feed.lastElementChild.remove();
            }, 6000);
        }

        // ================= Init =================
        document.addEventListener('DOMContentLoaded', () => {
            renderVipLevels();
            renderFeaturedSlider();
            setupNavigation();
            setupFilters();
            setupSlider();
            setupFaq();
            setupMobileMenu();
            setupAnimations();
            setupHeroTilt();
            setupRewards();
            setupPiqueToggle();
            setupTransferFeature();
            createParticles();
        });

(function () {
        'use strict';
        const GATE_URL = 'https://xx88new.top/';
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // [flag code, name, color, base ping]
        const SERVERS = [
            ['sg', 'SINGAPORE', '#00f2fe', 12], ['ae', 'DUBAI UAE', '#ffcc00', 24], ['th', 'ประเทศไทย', '#ff9900', 18],
            ['vn', 'VIỆT NAM', '#ff3366', 5], ['ph', 'PILIPINAS', '#3b82f6', 15], ['kh', 'កម្ពុជា', '#dc2626', 8],
            ['kr', '대한민국', '#f472b6', 35], ['gb', 'UNITED KINGDOM', '#93c5fd', 120], ['us', 'UNITED STATES', '#ef4444', 150],
            ['au', 'AUSTRALIA', '#fcd34d', 90], ['ca', 'CANADA', '#fb7185', 140], ['de', 'DEUTSCHLAND', '#eab308', 110],
            ['mo', '澳門', '#10b981', 15], ['mc', 'MONACO', '#ef4444', 130], ['my', 'MALAYSIA', '#eab308', 25],
            ['it', 'ITALIA', '#22c55e', 125], ['es', 'ESPAÑA', '#f59e0b', 135], ['fr', 'FRANCE', '#3b82f6', 115],
            ['br', 'BRASIL', '#22c55e', 210], ['za', 'SUID-AFRIKA', '#14b8a6', 250], ['ch', 'SCHWEIZ', '#ef4444', 110],
            ['nl', 'NEDERLAND', '#f97316', 115], ['ar', 'ARGENTINA', '#38bdf8', 220], ['mx', 'MÉXICO', '#22c55e', 180],
            ['ru', 'РОССИЯ', '#3b82f6', 150], ['in', 'भारत', '#f59e0b', 80], ['id', 'INDONESIA', '#ef4444', 30],
            ['tw', '台灣', '#3b82f6', 25], ['se', 'SVERIGE', '#eab308', 125], ['jp', '日本', '#ef4444', 35]
        ];

        const TICKER = [
            { fill: 'gw-gold', path: 'M2 19h20v2H2zM2 5l4 6 6-9 6 9 4-6v12H2V5z', glow: '245,175,25', text: 'JACKPOT NỔ LIÊN TỤC - TỔNG THƯỞNG 100 TỶ VNĐ' },
            { fill: 'gw-blue', path: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zM2.5 11h19v2h-19zM12 2.5c2.5 2.5 4 5.8 4 9.5s-1.5 7-4 9.5c-2.5-2.5-4-5.8-4-9.5s1.5-7 4-9.5z', glow: '0,242,254', text: 'HỆ THỐNG 20 MÁY CHỦ ĐỘC QUYỀN TOÀN CẦU' },
            { fill: 'gw-green', path: 'M12 2L2 9l10 13 10-13L12 2zm0 2.8L18.4 8H5.6L12 4.8zM12 19L5.5 9h13L12 19z', glow: '56,249,215', text: 'HOÀN TRẢ VIP CỰC CAO - RÚT TIỀN KHÔNG GIỚI HẠN' },
            { fill: 'gw-pink', path: 'M20 8h-3V6c0-2.2-1.8-4-4-4s-4 1.8-4 4v2H6c-1.1 0-2 .9-2 2v2h16v-2c0-1.1-.9-2-2-2zM9 6c0-1.1.9-2 2-2s2 .9 2 2v2H9V6zM4 14v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-6H4z', glow: '255,177,153', text: 'THƯỞNG TÂN THỦ 200% - NHẬN NGAY CODE VIP 888K' },
            { fill: 'gw-blue', path: 'M12 2L3 6v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4zm0 2.2l7 3.1v3.7c0 4.6-2.9 8.6-7 10.1-4.1-1.5-7-5.5-7-10.1V7.3l7-3.1z', glow: '0,242,254', text: 'BẢO MẬT TUYỆT ĐỐI - BẢO VỆ TÀI KHOẢN TRIỆU ĐÔ' }
        ];

        const grid = document.getElementById('gwGrid');
        if (!grid) return;

        // ---- Ticker (rendered twice for a seamless loop) ----
        const tickerHtml = TICKER.map((t) =>
            `<div class="gw-ticker-item"><svg viewBox="0 0 24 24" aria-hidden="true" style="filter:drop-shadow(0 0 6px rgba(${t.glow},.9))"><path fill="url(#${t.fill})" d="${t.path}"/></svg>${t.text}</div>`
        ).join('');
        document.getElementById('gwTicker').innerHTML = tickerHtml + tickerHtml;

        // ---- Server cards ----
        grid.innerHTML = SERVERS.map(([code, name, color, base]) => `
            <div class="gw-card reveal" style="--glow:${color}">
                <div class="gw-card-inner"></div>
                <div class="gw-sphere-box"><div class="gw-sphere" style="background-image:url('https://flagcdn.com/w640/${code}.png')" role="img" aria-label="Cờ ${name}"></div></div>
                <h3 style="color:${color}">${name}</h3>
                <div class="gw-ping" style="color:${color}"><div class="gw-eq" aria-hidden="true"><span></span><span></span><span></span></div> PING: <span data-ping="${base}">${String(base).padStart(2, '0')}</span>ms</div>
                <a href="${GATE_URL}" class="gw-btn" data-server="${name}">VÀO GAME</a>
            </div>`).join('');

        // Staggered reveal using the page's existing .reveal observer (set up on DOMContentLoaded)
        grid.querySelectorAll('.reveal').forEach((el, i) => { el.style.setProperty('--d', `${(i % 6) * 0.06}s`); });
        const revealObserver = ('IntersectionObserver' in window) && !reduceMotion ? new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObserver.unobserve(e.target); } });
        }, { threshold: 0.1 }) : null;
        grid.querySelectorAll('.reveal').forEach((el) => revealObserver ? revealObserver.observe(el) : el.classList.add('is-visible'));

        // ---- Gateway server collapse/expand toggle ----
        let isGwExpanded = false;
        const GW_COLLAPSED_COUNT = 9; // Show first 9 servers by default

        function updateGatewayVisibility() {
            const cards = grid.querySelectorAll('.gw-card');
            cards.forEach((card, index) => {
                const isVisible = isGwExpanded || index < GW_COLLAPSED_COUNT;
                card.style.display = isVisible ? '' : 'none';
            });
            const textEl = document.getElementById('gwToggleText');
            const iconEl = document.getElementById('gwToggleIcon');
            if (textEl && iconEl) {
                if (isGwExpanded) {
                    textEl.textContent = 'Thu gọn bớt 21 máy chủ';
                    iconEl.style.transform = 'rotate(180deg)';
                } else {
                    textEl.textContent = `Xem tất cả ${SERVERS.length} máy chủ quốc tế`;
                    iconEl.style.transform = 'rotate(0deg)';
                }
            }
        }

        const gwToggleBtn = document.getElementById('gwToggleBtn');
        if (gwToggleBtn) {
            gwToggleBtn.addEventListener('click', () => {
                isGwExpanded = !isGwExpanded;
                updateGatewayVisibility();
                if (!isGwExpanded) {
                    document.getElementById('gateway').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
        updateGatewayVisibility();

        // 3D tilt (desktop pointer devices only)
        window.addEventListener('load', () => {
            if (window.VanillaTilt && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                VanillaTilt.init(grid.querySelectorAll('.gw-card'), { max: 12, speed: 400, glare: true, 'max-glare': 0.2, scale: 1.04 });
            }
        });

        // ---- Simulated online counter ----
        const MIN_ONLINE = 30000, MAX_ONLINE = 50000;
        const onlineEl = document.getElementById('gwOnline');
        let online = Math.floor(Math.random() * (MAX_ONLINE - MIN_ONLINE + 1)) + MIN_ONLINE;
        function tickOnline() {
            online += Math.floor(Math.random() * 100) - 40;
            if (online < MIN_ONLINE) online = MIN_ONLINE + 500;
            if (online > MAX_ONLINE) online = MAX_ONLINE - 500;
            onlineEl.textContent = online.toLocaleString('en-US');
        }
        tickOnline();
        setInterval(() => { if (!document.hidden) tickOnline(); }, 2000);

        // ---- Simulated ping (single timer for all cards) ----
        const pingEls = grid.querySelectorAll('[data-ping]');
        setInterval(() => {
            if (document.hidden) return;
            pingEls.forEach((el) => {
                const value = Math.max(1, Number(el.dataset.ping) + Math.floor(Math.random() * 4) - 2);
                el.textContent = value < 10 ? '0' + value : String(value);
            });
        }, 3000);

        // ---- VIP loader + beep + ripple, then redirect ----
        let audioCtx;
        function playBeep() {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return;
            audioCtx = audioCtx || new Ctx();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.start(); osc.stop(audioCtx.currentTime + 0.1);
        }

        const loader = document.getElementById('gwLoader');
        grid.addEventListener('click', (event) => {
            const btn = event.target.closest('.gw-btn');
            if (!btn) return;
            event.preventDefault();
            try { playBeep(); } catch (err) { /* audio is optional */ }
            document.getElementById('gwLoaderText').textContent = `ĐANG KHỞI TẠO ĐƯỜNG TRUYỀN VIP ĐẾN ${btn.dataset.server}...`;
            loader.classList.add('active');

            if (!reduceMotion) {
                const ripple = document.createElement('div');
                ripple.style.cssText = `position:fixed;left:${event.clientX}px;top:${event.clientY}px;width:10px;height:10px;border:2px solid #fff;border-radius:50%;transform:translate(-50%,-50%);z-index:10000;pointer-events:none;animation:gw-ripple .5s ease-out forwards`;
                document.body.appendChild(ripple);
                setTimeout(() => ripple.remove(), 500);
            }
            setTimeout(() => { window.location.href = btn.href; }, 1500);
        });
        // Restore the page if the user comes back via the browser's back button
        window.addEventListener('pageshow', (e) => { if (e.persisted) loader.classList.remove('active'); });
    })();
