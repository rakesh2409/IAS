import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'makerFlag'
})
export class MakerCheckerPipe implements PipeTransform {
    transform(value: any[], args: any[]): any {
        return value.filter((item) => item.makerFlag === true);
    }
}