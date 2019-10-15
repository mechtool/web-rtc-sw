import {trigger, animate, style, state, group, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', [
/* order */
/* 1 */ query(':enter, :leave', style({ position: 'absolute', width:'100%' })
    , { optional: true }),
/* 2 */ group([  // block executes in parallel
            query(':enter', [
                style({ transform: 'translateX(100%)' }),
                animate('400ms ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateX(0%)' }),
                animate('400ms ease-in-out', style({ transform: 'translateX(-100%)' }))
            ], { optional: true })
        ])
    ])
]) ;

export const sideNavListTrigger = trigger('sideNavListTrigger', [
    transition('* <=> *', [ // each time the binding value changes
        query(':leave', [
            stagger(200, [
                animate(300, style({opacity : 0,  transform : 'translateY(30px)' }))
            ])
        ],  { optional: true }),
        query(':enter', [
            style({ opacity : 0, transform: 'translateY(-30px)' }),
            stagger(200, [
                animate(300, style({opacity : 1, transform : 'translateY(0)' }))
            ])
        ],  { optional: true })
    ])
])  ;

export const localMenuTrigger = trigger('localMenuTrigger', [
    state('true', style({  transform : 'translateY(0%)'})),
    state('false', style({ transform : 'translateY(-150%)'})),
    transition('true <=> false', [ // each time the binding value changes
        animate(200)
    ])
]) ;
