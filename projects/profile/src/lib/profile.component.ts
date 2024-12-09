import { AfterViewChecked, ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-profile',
  imports: [CommonModule],
  template: `
    <div class="profile-wrap">
      @if (src().trim() != '') {
        <div class="user-profile" [ngStyle]="getStyleProp()">
            <img class="contentImage" [ngStyle]="{ 'border-radius': shape() == 'squre' ? borderRadius() ? borderRadius()+'px' : '0px' : '50%'  }" [src]="src()" [alt]="altText()" [height]="eleHeight()" [width]="eleWidth()" />
        </div>
      } @else {
        <div class="text-profile" [ngStyle]="getStyleProp()">
          <p class="refText" [ngStyle]="getTextStyle()"> {{ content().split(' ').length > 1 ?  content().split(' ')[0].charAt(0).toUpperCase()+content().split(' ')[1].charAt(0).toUpperCase() : content().split(' ')[0].charAt(0).toUpperCase() }} </p>
        </div>
      }
    </div>
  `,
  styles: `
    .profile-wrap {
      text-align: center;
      height: 100%;
      width: 100%;
      .user-profile {
        .contentImage {
          object-fit: cover;
        }
      }
      .text-profile {
        text-align: center;
        display : flex;
        justify-content: center;
        align-items: center;
        .refText {
          font-size: 20px !important;
          line-height: 1;
          color: #ffffff;
        }
      }
    }
    .rouded {
      .user-profile, .user-profile {
        border-radius: 50%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  service = inject(ProfileService);
    bgColor:InputSignal<any> = input('');
    content:InputSignal<string> = input('Some one');
    shape:InputSignal<'squre'> | InputSignal<'rounded'> = input('squre');
    src:InputSignal<string> = input('');
    altText:InputSignal<string> = input('Example Image');
    opacity:InputSignal<string> | InputSignal<number> = input(1);
    borderwidth:InputSignal<string> | InputSignal<number>= input('');
    borderColor:InputSignal<any> = input('');
    eleHeight:InputSignal<string> | InputSignal<number>= input(40);
    eleWidth:InputSignal<string> | InputSignal<number>= input(40);
    textFontSize:InputSignal<number> = input(22);
    borderRadius:InputSignal<string> | InputSignal<number> = input('');

    getStyleProp():{ [key:string]: string } {
      const bgColor = this.bgColor().trim();
      const shape = this.shape();
      const src = this.src().trim();
      const width = this.borderwidth().toString().trim();
      const color = this.borderColor().trim();
      const name = this.content().trim();

      const style: { [key: string]: string } = {};
      if(width != '' && color != '') {
        style['border'] = `${width}px solid ${color}`;
      } else if(width != '' && color == '') {
        style['border'] = `${width}px solid black`;
      } else if(width == '' && color != '') {
        style['border'] = `1px solid ${color}`;
      } else {
        style['border'] = '0';
      }
      if(src == '' && bgColor == '') {
        style['background'] = this.service.randomBgColor(Number(this.opacity()), name)
      } else if(src == '' && bgColor != '') {
        style['background'] = bgColor;
      } else if(src != '') {
        style['background'] = 'transparent';
      }

      style['height'] = this.eleHeight()+'px';
      
      style['width'] = this.eleWidth()+'px';

      if(shape == 'rounded') {
        style['border-radius'] = '50%';
      } else {
        style['border-radius'] = '0%';
      }

      if(this.borderRadius()) {
        style['border-radius'] = this.borderRadius()+'px';
      }

      return style;
    }

    getTextStyle(): { [key: string]: string }  {
      const style: { [key: string]: string } = {};
      style['font-size'] = this.textFontSize()+'px';
      return style
    }

}
