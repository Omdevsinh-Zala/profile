# Profile

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## How to install

To use this package, run

i. Add this package separatly by
   ```bash
   npm install ng-profile-box
   ```
or

ii. directly add into your angular project
   ```bash
   ng add ng-profile-box
   ```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

# How to add in your project

1. After installing this package in your project import the component in `Component.ts` or `Module.ts` file
```
import { ProfileComponent } from 'ng-profile-box';
```
after importing it add it in your `imports`.

2. Now add
```
<lib-profile />
```
to your html file and your done.

# Use cases

|    Inputs    |   Default values   |                              Instructions                                  |
|--------------|--------------------|----------------------------------------------------------------------------|
| bgColor      | none               | Default value is none. To add a specific <br> background color, use `bgColor="color"`.  |
| content      | Some one           | To add the content, use `content`. It will <br> take the first letter and display it in the box. |
| shape        | squre              | Will take two value either `squre` for squre shape <br> or `round` for round shape <br> `shape="round"` |
| src          | none               | If want to add `image` instead `content` use <br> `src="image"`. |
| altText      | none               | Add alt text to your image `altText="image ref"` |
| borderwidth  | 0                  | Add border-width to the element <br> `borderwidth="1"`. |
| borderColor  | none               | Add border-color to the element <br> `borderColor="color"`. |
| eleHeight    | 40                 | To adjust height of the element <br> `eleHeight=""50`. |
| eleWidth     | 40                 | To adjust width of the element <br> `eleWidth=""50` |
| textFontSize | 22                 | To adjust font-size of the `content` <br> `textFontSize="28"`. |
| borderRadius | 0                  | To apply custom border-radius to the element <br> `borderRadius="8"`. |


## Additional Resources

This package is still in development, undergoing continuous improvements, and will take some time to reach a stable version.

For any issues or feedback regarding this package, please submit them on the [GitHub Issues](https://github.com/Omdevsinh-Zala/profile/issues) page.
