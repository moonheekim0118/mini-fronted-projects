# MODAL & MENU SLIDER
- landing page implementing modal and menu slider

### Requirement
- toggle 버튼을 이용하여 메뉴 슬라이더를 구현한다.
- modal을 구현한다. 
- modal 구현 시, 뒷배경은 흐릿하게 처리해준다.


### how to Implement Modal?

```CSS

.modal-container{ /* modal 창 띄워졌을 때 전체 페이지*/
    background-color: rgba(0,0,0,0.6);
    display: none; /* 오픈 버튼 클릭시에만 block으로 처리해주도록*/
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom :0;
}

.modal-container.show-modal{
    display: block;

}

.modal{ /* modal 창*/
    background-color: #fff;
    position: absolute;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    width: 400px;
    animation-name: modalopen;
    animation-duration: var(--modal-duration);
}

```