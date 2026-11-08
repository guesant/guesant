import { decorate, inject, injectable } from 'inversify';

export function configureInjection<Dependencies extends unknown[]>(
  implementation: new (...dependencies: Dependencies) => unknown,
  symbols: { readonly [Index in keyof Dependencies]: symbol },
): void {
  const service = injectable();

  decorate(service, implementation);

  for (const [
    index,
    symbol,
  ] of symbols.entries()) {
    const dependency = inject(symbol);

    decorate(dependency, implementation, index);
  }
}
