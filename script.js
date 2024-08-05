document.addEventListener('DOMContentLoaded', () => {
    const solarSystem = document.getElementById('solar-system');
    const orbits = document.querySelectorAll('.orbit');
    const tooltip = document.getElementById('tooltip');

    let scale = 1;
    const minScale = 0.5;
    const maxScale = 2;
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    // 행성 회전 로직 (이전과 동일)
    orbits.forEach((orbit, index) => {
		const planets = orbit.querySelectorAll('.planet');
        const orbitRadius = orbit.offsetWidth / 2;
        const speed = 0.001 * (index + 1);
        let angle = 0;

        function rotatePlanets() {
            planets.forEach((planet, planetIndex) => {
                const planetAngle = angle + (2 * Math.PI / planets.length) * planetIndex;
                const x = Math.cos(planetAngle) * orbitRadius;
                const y = Math.sin(planetAngle) * orbitRadius;
                planet.style.transform = `translate(${x}px, ${y}px)`;
            });
            angle += speed;
            requestAnimationFrame(rotatePlanets);
    });

    // 확대/축소 기능
    document.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        scale = Math.max(minScale, Math.min(maxScale, scale + delta));
        solarSystem.style.transform = `scale(${scale})`;
    });

    // 드래그 기능
    solarSystem.addEventListener('mousedown', (e) => {
        if (e.button === 2) { // 오른쪽 마우스 버튼
            e.preventDefault();
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = solarSystem.offsetLeft;
            startTop = solarSystem.offsetTop;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const newLeft = startLeft + dx;
            const newTop = startTop + dy;

            // 경계 체크
            const maxLeft = window.innerWidth - solarSystem.offsetWidth;
            const maxTop = window.innerHeight - solarSystem.offsetHeight;

            solarSystem.style.left = `${Math.max(0, Math.min(maxLeft, newLeft))}px`;
            solarSystem.style.top = `${Math.max(0, Math.min(maxTop, newTop))}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

	document.querySelectorAll('.celestial-body, .planet').forEach(body => {
        body.addEventListener('click', (e) => {
            tooltip.textContent = e.target.dataset.info;
            tooltip.style.left = `${e.pageX}px`;
            tooltip.style.top = `${e.pageY}px`;
            tooltip.style.display = 'block';
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.celestial-body') && !e.target.closest('.planet')) {
            tooltip.style.display = 'none';
        }
    });

    // 오른쪽 클릭 메뉴 비활성화
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});
