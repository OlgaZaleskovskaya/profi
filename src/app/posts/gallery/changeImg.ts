import { trigger, transition, animate, style } from '@angular/animations';

export const changePictureTrigger = trigger('changePicture', [
  transition('* => *', [
    animate(400, style([{
      opacity: 1
    }
    ])),
    animate(400, style([{
      opacity: 0
    }])),
    animate(400, style([{
      opacity: 1
    }])),
  ])
])
