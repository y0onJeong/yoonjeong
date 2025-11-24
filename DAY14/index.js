export default async function main() {
    console.log('start app')
    let currentIndex = 0;
    const menuitems = document.querySelectorAll(".menu-item");

    console.log(menuitems.length)
    const menuitems_count = menuitems.length

    menuitems[currentIndex].classList.add("select")

    window.addEventListener("keydown", (e) => {
        console.log(e.key)
        menuitems[currentIndex].classList.remove("select")

        if(e.key == "ArrowUp"){
        currentIndex--
        if (currentIndex < 0 ) {
        currentIndex = menuitem_count-1
        }
    }

        else if(e.key == "ArrowDown"){
        currentIndex++
        currentIndex %=menuitem_count
        }
        else if(e.key == "Enter"){
            console.log(menuitems[currentIndex])
        }
        
    })
    console.log[currentIndex].classList.add('select')
    menuitems[currentIndex].classList.add("select")
}


