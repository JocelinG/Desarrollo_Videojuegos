class Bootloader extends Phaser.Scene{
    constructor(){
        super({
            key: 'Bootloader'
        });
        this.direccion = 1;
        this.direccion2 = 1;
        this.select =0;
        this.select2=0;
        
    }

    init() {
        console.log('Escena Bootloader');
    }
    


    preload() {
        this.load.path = './assets/';

        this.load.atlas('tomato', 'tomato_atlas/tomato.png',
                        'tomato_atlas/tomato_atlas.json');
        this.load.animation('tomatoAnim','tomato_atlas/tomato_anim.json');

        //cargamos la animacion de tarma
        this.load.atlas('marco','marco_atlas/marco.png','marco_atlas/marco_atlas.json');
        this.load.animation('marcoAnim','marco_atlas/marco_anim.json');
        //----fin de carga de animacion de tarma---------------

        this.load.image('nivel1','Background_nivel_1.png');
        this.load.image('seleccion','seleccion_personaje.png');
        this.load.image('seleccion_puerta', 'seleccion_puerta.png');

        // this.load.spritesheet('tomato', 'tomato/tomato.png', {
        //     frameWidth: 16,
        //     frameHeight: 25
        // });
        // this.load.spritesheet('tomato_spacing', 'tomato_spacing/tomato_spacing.png', {
        //     frameWidth: 16,
        //     frameHeight: 25,
        //     margin: 1,
        //     spacing: 2

        // });

    }

create() {
        const KeyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;
        var velocidad = 1;
        var velocidad2 = 1;

//creando el JSON para que utilicemos teclas para mover el personaje yoshi
        this.teclas = this.input.keyboard.addKeys({
            w: KeyCodes.UP, 
            s: KeyCodes.DOWN,
            a: KeyCodes.LEFT,
            d: KeyCodes.RIGHT
        });
    //agregamos las teclas que se ocuparan en el lugar de as tradicionales
    this.teclas = this.input.keyboard.addKeys('w,s,a,d');
//------------------


        //this.yoshi = this.add.image(100, 100, 'yoshi');
        // this.tomato = this.add.sprite(100, 100, 'tomato',0).setScale(4);
        // this.tomato_spacing = this.add.sprite(100, 200, 'tomato_spacing',0).setScale(4);

        //agregamos los sprites para poder manipularlos
        this.tomato    = this.add.sprite(250,265,'tomato').setScale(4);
        this.marco     = this.add.sprite(130, 265, 'marco_smile').setScale(2);

        this.fondo     = this.add.image(100,180, 'nivel1').setScale(1.3);
        this.seleccion = this.add.image(300, 180, 'seleccion').setScale(1);

        //primer puerta de seleccion
        this.seleccion_puerta = this.add.image(125,224,'seleccion_puerta').setScale(1);
        this.seleccion_puerta.setInteractive();
        this.seleccion_puerta.setName("seleccion_puerta");

        //segunda puerta de seleccion
        this.seleccion_puerta2 = this.add.image(242,224,'seleccion_puerta').setScale(1);
        this.seleccion_puerta2.setInteractive();
        this.seleccion_puerta2.setName("seleccion_puerta2");


        //fisicas 
        //this.seleccion_puerta.setAcceleration(0,10);
    // this.anims.create({
    //     //nombre de la animacion
    //     key: 'tomato_walk',
    //     //se cargan los frames por numeros
    //     //generateFrameNames() //se usa cuando ya existe un Atlas
    //     frames: this.anims.generateFrameNumbers('tomato',{
    //         prefix: 'tomato_animation_1_',
    //         start: 0,
    //         end: 7
    //     }),
    //     repeat: -1,
    //    frameRate: 10
        //esta es otra manera de agragar los frames, solo que de manera mas explicita
        // frames: this.anims.generateFrameNumbers('tomato_spacing', {
        //     frames: [0, 1, 2, 3, 4, 5, 6, 7]
        //     }),
    //});

    // console.log(this.anims.generateFrameNumbers('tomato_spacing',{
    //     start: 0,
    //     end: 7
    // }));
    //this.tarma.anims.play('smile');

    this.input.on(eventos.GAMEOBJECT_DOWN, (pointer, gameObject)=>{
//--------------------inicio del if para ver que gameOBject es-----------------   
    if(gameObject.name == "seleccion_puerta"){
        //----------------ver si la puerta de seleccion esta abierta o cerrada-----------
            if(this.seleccion_puerta.y > 220 && this.select == 0){

                for(var i =0; i < 200; i++){
                    this.seleccion_puerta.y -= this.direccion * velocidad; 

                    if(this.select2 == 1){
                        this.seleccion_puerta2.y += this.direccion2 * velocidad2; 
                    }
                }
                this.select2 = 0;
                this.select = 1;
            }else if(this.select == 1){
                for(var i =0; i < 200; i++){
                    this.seleccion_puerta.y += this.direccion * velocidad; 
                }

                this.select = 0;
            }
        //----------------fin de ver si la puerta de seleccion esta abierta o cerrada-------------
    }//---------------fin del if para ver que gameOBject es----------------------------


//--------------------inicio del if para ver que gameOBject es-----------------   
        if(gameObject.name == "seleccion_puerta2"){
            //----------------ver si la puerta de seleccion esta abierta o cerrada-----------
                if(this.seleccion_puerta2.y > 220 && this.select2 == 0){
                    for(var i =0; i < 200; i++){
                        this.seleccion_puerta2.y -= this.direccion2 * velocidad2; 
                        if(this.select == 1){
                            this.seleccion_puerta.y += this.direccion * velocidad
                        }
                    }
                    this.select = 0;
                    this.select2 = 1;
                }else if(this.select2 == 1){
                    for(var i = 0; i < 200; i++){
                        this.seleccion_puerta2.y += this.direccion2 * velocidad2; 
                    }
                    this.select2 = 0;
                }
            //----------------fin de ver si la puerta de seleccion esta abierta o cerrada-------------
        }//---------------fin del if para ver que gameOBject es----------------------------
    });

    this.tomato.anims.play('tomato_idle');
    //esta es otra manera de llamar a la funcion para activar la animacion
    //this.anims.play('tomato_camina', this.tomato_spacing);
}

    update(time, delta) {
        //para que el personaje solo se mueva mientras esta
        //presionada la tecla

        //al parecer con este metodo se queda pre iniciada
        //la animacion al poner isUp

        this.marco.setDepth(3);
        this.tomato.setDepth(3);
        this.seleccion.setDepth(4);
        this.seleccion_puerta.setDepth(3);
        this.seleccion_puerta2.setDepth(3);

        if(this.teclas.w.isUp){
                this.marco.anims.play('marco_barrida');
       }
       
    //    if(this.teclas.a.isUp){
    //             this.marco.anims.play('marco_idle');
    //    }
       
    //    if(this.teclas.s.isUp){
    //             this.marco.anims.play('marco_idle');
    //    }
       
    //    if(this.teclas.w.isDown){
    //         this.marco.anims.play('marco_cuchillada');
    //     }

        // if(this.teclas.a.isDown){
        //     this.marco.anims.play('marco_barrida');
        // }

        // if(this.teclas.s.isDown){
        //  this.marco.anims.play('marco_smile');
        // }
    }
}

export default Bootloader;