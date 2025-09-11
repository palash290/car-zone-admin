import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'chfCurrency',
    standalone: true
})
export class ChfCurrencyPipe implements PipeTransform {
    transform(value: number | string): string {
        if (value == null || value === '') return '';

        let num = typeof value === 'string' ? parseFloat(value) : value;

        // Format with apostrophe as thousands separator
        let parts = num.toFixed(0).toString().split('');
        for (let i = parts.length - 3; i > 0; i -= 3) {
            parts.splice(i, 0, "'");
        }

        return `${parts.join('')}.– CHF`;
    }
}
