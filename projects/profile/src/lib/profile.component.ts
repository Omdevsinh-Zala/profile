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
            <img [src]="src()" [alt]="altText()" [height]="eleHeight()" [width]="eleWidth()" />
        </div>
      } @else {
        <div class="text-profile" [ngStyle]="getStyleProp()">
          <p class="refText"> {{ content().split(' ').length > 1 ?  content().split(' ')[0].charAt(0).toUpperCase()+content().split(' ')[1].charAt(0).toUpperCase() : content().split(' ')[0].charAt(0).toUpperCase() }} </p>
        </div>
      }
    </div>
  `,
  styles: `
    .profile-wrap {
      text-align: center;
      height: 100%;
      width: 100%;
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
export class ProfileComponent implements AfterViewChecked {
  service = inject(ProfileService);
    bgColor:InputSignal<any> = input();
    content:InputSignal<string> = input('Some one');
    shape:InputSignal<'squre'> | InputSignal<'rounded'> = input('squre');
    src:InputSignal<string> = input('');
    altText:InputSignal<string> = input('Example Image');
    opacity:InputSignal<string> | InputSignal<number> = input(1);
    borderwidth:InputSignal<string> | InputSignal<number>= input(0);
    borderColor:InputSignal<any> = input();
    eleHeight:InputSignal<string> | InputSignal<number>= input(80);
    eleWidth:InputSignal<string> | InputSignal<number>= input(80);

    ngAfterViewChecked(): void {
      this.getStyleProp();
    }
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
      console.log(bgColor);
      if(src == '' && bgColor == '') {
        style['background'] = this.service.randomBgColor(Number(this.opacity()), name)
        console.log('1')
      } else if(src == '' && bgColor != '') {
        style['background'] = bgColor;
        console.log('2')
      } else if(src != '') {
        style['background'] = 'transparent';
        console.log('3')
      }

      style['height'] = this.eleHeight()+'px';
      
      style['width'] = this.eleWidth()+'px';

      if(shape == 'rounded') {
        style['border-radius'] = '50%';
      } else {
        style['border-radius'] = '0%';
      }

      return style;
    }

}